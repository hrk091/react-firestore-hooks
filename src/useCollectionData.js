// @flow

import { useEffect, useState } from "react"
import { firestore } from "firebase/app"
import { snapshotToData } from "./utils"
import useCollection from "./useCollection"

export default function useCollectionData(
  query: firestore.Query,
  options?: {
    idField?: string,
    snapshotListenOptions?: firestore.SnapshotListenOptions,
    disabled?: boolean
  }
): [any, boolean, ?Error] {
  const [data, setData] = useState()

  const snapshotListenOptions = options ? options.snapshotListenOptions : null
  const idField = options ? options.idField : null
  const disabled = options ? options.disabled : false

  const [snapshot, loading, error] = useCollection(query, { snapshotListenOptions, disabled })
  useEffect(() => {
    setData(snapshot ? snapshot.docs.map(snapshot => snapshotToData(snapshot, idField)) : undefined)
  }, [snapshot, idField])

  return [data, loading, error]
}
