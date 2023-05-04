import axios from 'axios'
import { QuestDetailProps } from 'views/common/pages/QuestDetailPage'
import { QuestResponseItem } from '../../src/services/questService'

export { QuestDetail as default } from 'views/common/pages/QuestDetailPage'

export async function getServerSideProps(context) {
  let questData = null
  try {
    const slug = context.query.id
    const endpoint = process.env.NEXT_PUBLIC_API_URL + `/v1/quest/slug/${slug}`
    const resp = await axios.get<QuestResponseItem>(endpoint)
    questData = resp.data
  } catch (e) {
    console.error('QuestDetail-page:fetch quest error', e)
  }
  const props: QuestDetailProps = {
    questData: questData,
  }

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59',
  )

  return {
    props: props,
  }
}
