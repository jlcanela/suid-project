import { createMemo } from 'solid-js';
import { CreateQueryResult } from '@tanstack/solid-query';

const StatusMessage = ({ query }: { query: CreateQueryResult<any, Error> }) => {
  const isPending = createMemo(() => query.isPending);
  const isError = createMemo(() => query.isError);
  const errorMessage = createMemo(() => query.error?.message);

  return (
    <>
      {isPending() && <p>Loading...</p>}
      {isError() && errorMessage() && <p>Error: {errorMessage()}</p>}
    </>
  );
};

export default StatusMessage;
