import axios from 'axios'
import { RaffleDetailProps } from 'views/common/pages/RaffleDetailPage'
import { raffleSSRService } from '../../src/services/raffleService'

export { RaffleDetail as default } from 'views/common/pages/RaffleDetailPage'

export async function getServerSideProps(context) {
  let data = null
  try {
    const slug = context.query.id
    const resp = await raffleSSRService.getRaffleBySlug(slug)
    data = resp
  } catch (e) {
    console.error('QuestDetail-page:fetch quest error', e)
  }
  const props: RaffleDetailProps = {
    raffleData: data,
  }

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59',
  )

  return {
    props: props,
  }
}
