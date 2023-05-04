import { EmptyState } from 'components/EmptyState'
import { PointCardSkeleton } from 'components/skeleton/PointCardSkeleton'
import { useAuthData } from 'lib/AuthDataContext'
import React, { useEffect, useState } from 'react'
import {
  IUserProjectPoint,
  userProjectPointService,
} from 'services/userProjectPointService'
import { MyPointCard } from 'views/common/MyPointCard'

interface MyPointProps {}

const MyPoint: React.FC<MyPointProps> = () => {
  const { authData } = useAuthData()

  const [list, setList] = useState<IUserProjectPoint[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (authData) {
      getMyPoint()
    } else {
      setList([])
    }
  }, [authData])

  const getMyPoint = async () => {
    try {
      const res = await userProjectPointService.getUserProjectPoint()
      if (res) {
        setList(res)
      }
    } catch (error) {}
    setLoading(false)
  }

  return (
    <React.Fragment>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 my-4">
        {!loading &&
          list?.map((item, index) => (
            <React.Fragment key={index}>
              <MyPointCard item={item} />
            </React.Fragment>
          ))}
        {loading && (
          <React.Fragment>
            <PointCardSkeleton />
            <PointCardSkeleton />
            <PointCardSkeleton />
            <PointCardSkeleton />
          </React.Fragment>
        )}
      </div>

      {!loading && !list?.length && (
        <div className="flex justify-center w-full">
          <EmptyState
            category="point"
            text="No Point Yet"
            subtitle="Go join the quest to get reward!"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default MyPoint
