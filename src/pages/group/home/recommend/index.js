import React, { useState, useEffect } from "react"
import { FlatList } from "react-native"
import { PanelContent } from '../component/panel-content'
// import { useCommentList } from '../../../../utils/data/comment-list'
import { useClinet } from "../../../../utils/client"
import { QZ_TJDT } from '../../../../utils/path-map'

export const Recommend = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 3
  })
  const [list, setList] = useState([])
  const { get } = useClinet()
  let total = 1
  useEffect(() => {
    getList(false)
  }, [params]);
  const [show, setShow] = useState(false)
  const getList =async (isNew) => {
    const res = await get(QZ_TJDT, params)
    total = res.pages
    if (isNew) {
      setList(res.data)
    } else {
      setList([...list, ...res.data])
    }
  }
  const onEndReached = () => {
    if (params.page > total) {
      setShow(true)
      return
    }
    setParams({
      ...params,
      page: params.page + 1
    })
  }
  return (
    <FlatList
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      data={list}
      keyExtractor={item => item.tid + ''}
      renderItem={(item, index) => <PanelContent key={index} detail={item} show={show} getList={getList} />}
    />)
}