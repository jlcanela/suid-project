import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TableFooter,
    IconButton,
  } from "@suid/material";
  import VisibilityIcon from "@suid/icons-material/Visibility";
  import EditIcon from "@suid/icons-material/Edit";
  import DeleteIcon from "@suid/icons-material/Delete";
  import { Accessor, For } from "solid-js";
  import {
    flexRender,
    getCoreRowModel,
    ColumnDef,
    createSolidTable,
    CellContext,
  } from "@tanstack/solid-table";
import { ArrayElement } from "./GeneratedTypesUtils";
  
  interface CustomTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
  }
  
  export function CustomTable<T>({data, columns}: CustomTableProps<T>) {

    const table = createSolidTable({
      get data() {
        return data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="projects table">
            <TableHead>
              <For each={table.getHeaderGroups()}>
                {(headerGroup) => (
                  <TableRow>
                    <For each={headerGroup.headers}>
                      {(header) => (
                        <TableCell>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </TableHead>
            <TableBody>
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </TableBody>
{/*             <TableFooter>
              <For each={table.getFooterGroups()}>
                {(footerGroup) => (
                  <TableRow>
                    <For each={footerGroup.headers}>
                      {(header) => (
                        <TableCell>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                              )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </TableFooter> */}
          </Table>
          <div class="h-4" />
          {/* <button onClick={() => rerender()} class="border p-2">
            Rerender
          </button> */}
        </TableContainer>
      </>
    );
  }

  export function makeColumnDef<TData, TValue>(col: string): ColumnDef<TData, TValue> {
    return ({
      accessorKey: col,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    });
  
  }

  export function makeActionColumn<TData, TValue>(path: string, handleDelete: (id: number) => any, fetch_id: (row: TData) => string): ColumnDef<TData, TValue> {
  //
    return ({
      accessorKey: "action",
      cell: (info) => {
        const id =  fetch_id(info.row.original);
        return (
        <div>
          <a href={`${path}/${id}`}>
            <IconButton aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </a>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(parseInt(id))}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )},
      footer: (info) => info.column.id,
    });
}

  
export function makeColumnDefs<TData, TValue>(cols: string[], path: string, handleDelete: (id: number) => any, fetch_id: (row: TData) => string): ColumnDef<TData, TValue>[] {
    const columnDefs: ColumnDef<TData, TValue>[] = cols.map(makeColumnDef<TData, TValue>);
  
    const actionColumnDef: ColumnDef<TData, TValue> = makeActionColumn<TData, TValue>(path, handleDelete, fetch_id);
  
    return [...columnDefs, actionColumnDef];
  }
