// @flow

import { firestore } from "firebase/app"

export function snapshotToData(snapshot: firestore.QueryDocumentSnapshot, idField: ?string) {
  const meta = idField ? { [idField]: snapshot.id } : null
  return { ...snapshot.data(), ...meta }
}

