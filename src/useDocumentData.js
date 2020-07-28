// @flow

import { useEffect, useState } from "react"
import { firestore } from "firebase/app"


export default function useDocumentData(
  docRef: firestore.DocumentReference,
  options?: {
    idField?: string,
    snapshotListenOptions?: firestore.SnapshotListenOptions,
    disabled: boolean
  }
): [any, boolean, ?Error] {
  const [data, setData] = useState()

  const snapshotListenOptions = options ? options.snapshotListenOptions : null
  const idField = options ? options.idField : null
  const disabled = options ? options.disabled : false

  const [snapshot, loading, error] = useDocument(docRef, { snapshotListenOptions, disabled })
  useEffect(() => {
    setData(snapshot ? snapshotToData(snapshot, idField) : undefined)
  }, [snapshot, idField])

  return [data, loading, error]
}

