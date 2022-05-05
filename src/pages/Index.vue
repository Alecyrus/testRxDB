<script lang="ts" setup>
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageLoki } from 'rxdb/plugins/lokijs';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { nanoid } from 'nanoid';

import { documentSchemaLiteral } from './document';
addRxPlugin(RxDBQueryBuilderPlugin);
onMounted(async () => {
  const clientDB = await createRxDatabase({
    name: `workspac.db`,
    storage: getRxStorageLoki({
      // @ts-ignore
      adapter: new IncrementalIndexedDBAdapter(),
    }),
    multiInstance: true,
    eventReduce: true,
    ignoreDuplicate: true,
  });

  const _collections = await clientDB.addCollections({
    documents: {
      schema: documentSchemaLiteral,
    },
  });

  console.log('The documents:', await _collections.documents.find().exec());

  await _collections.documents.atomicUpsert({
    id: nanoid(),
  });
  console.log(
    'New documnet is inserted',
    await _collections.documents.find().exec(),
  );
});
</script>
<template>
  <div flex="~ col" w="screen"></div>
</template>

<style lang="sass" scoped></style>
