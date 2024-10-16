import { createSignal, Match, Switch } from "solid-js";
import { CustomTable, makeColumnDefs } from "../components/CustomTable";
import { DeleteModal } from "../components/DeleteModal";
import { ColumnDef } from "@tanstack/solid-table";
import { CreateQueryResult } from "@tanstack/solid-query";

export default function EntityTable<TData, TRow, Id>({ 
    columnNames, 
    path,
    prepareDeleteMessage,
    fetch_id,
    query,
    fetch_data,
    deleteEntity
  }: {
    columnNames: string[], 
    path: string,
    prepareDeleteMessage: (TRow) => string,
    fetch_id: (TRow) => Id,
    query: CreateQueryResult<TData, Error>,
    fetch_data: (TData) => Array<TRow>,
    deleteEntity: (Id) => void
  }) {
  
  const [open, setOpen] = createSignal(false);
  const [selectedId, setSelectedId] = createSignal<number | null>(null);
  const [message, setMessage] = createSignal(prepareDeleteMessage(undefined));

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setMessage(prepareDeleteMessage(undefined))
    //setMessage(`Are you sure you want to delete this project (#${id})?`);
    setOpen(true);
  };

  const onDelete = () => {
    deleteEntity(selectedId());
  };
  
  const columns: ColumnDef<TRow, unknown>[] = makeColumnDefs<TRow, unknown>(
    columnNames,
    path,
    handleDelete, 
    (e: TRow) => fetch_id(e).toString(),
  );

  return (
    <>
    <Switch>
      <Match when={query.isPending}>
        <p>Loading...</p>
      </Match>
      <Match when={query.isError}>
        <p>Error: {query.error.message}</p>
      </Match>
      <Match when={query.isSuccess}>
        <CustomTable<TRow> 
          data={ fetch_data(query)} 
          columns={columns} 
        />
      </Match>
    </Switch>
    <DeleteModal
        openSignal={[open, setOpen]}
        message={[message, setMessage]}
        onDelete={onDelete}
      />
    </>
  )
}
