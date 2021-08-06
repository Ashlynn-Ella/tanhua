import React, { useState, useEffect, useCallback } from "react"
import { useClinet } from "../client"
import { QZ_TJDT } from '../path-map'

export const useCommentList = ({ page, pagesize }) => {
  const { get } = useClinet()
  const [list, setList] = useState([])
  const [total, setTotal] = useState(1)
  const refresh = useCallback(async () => {
    const res = await get(QZ_TJDT, { page, pagesize })
    if (page <= res.pages){
      setList(res.data)
    }   
    setTotal(res.pages)
  }, [page, pagesize])
  useEffect(async () => {
    const res = await get(QZ_TJDT, { page, pagesize })
    setTotal(res.pages)
    if (page <= res.pages){
      setList([...list, ...res.data])
    }      
  }, [page, pagesize])
  return { list, total, refresh }
}