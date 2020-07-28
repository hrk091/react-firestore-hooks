// @flow

import { useCallback, useEffect, useState } from "react"
import { firestore } from "firebase/app"


export default function useDocument(
  docRef: firestore.DocumentReference,
  options?: {
    snapshotListenOptions?: firestore.SnapshotListenOptions,
    disabled: boolean
  }
): [firestore.DocumentSnapshot, boolean, ?Error] {
  const snapshotListenOptions = options ? options.snapshotListenOptions : null
  const disabled = options ? options.disabled : false

  const [snapshot, setSnapshot] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const onNext = useCallback(
    (next: firestore.DocumentSnapshot) => {
      if (!snapshot || !snapshot.isEqual(next)) {
        setSnapshot(next)
        setLoading(false)
      }
    },
    [snapshot]
  )
  const onError = useCallback(err => {
    setError(err)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (disabled) {
      return
    }
    const unsubscribe = snapshotListenOptions
      ? docRef.onSnapshot(snapshotListenOptions, onNext, onError)
      : docRef.onSnapshot(onNext, onError)
    return () => {
      unsubscribe()
    }
  }, [onNext, onError, docRef, snapshotListenOptions, disabled])

  return [snapshot, loading, error]
}

