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
  } from "@tanstack/solid-table";
  
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
  
    // <TableContainer component={Paper}>
  
    //               <TableCell>
    //                 <IconButton
    //                   onClick={() => viewProject(project.id)}
    //                   aria-label="view"
    //                 >
    //                   <VisibilityIcon />
    //                 </IconButton>
    //                 <IconButton
    //                   onClick={() => editProject(project.id)}
    //                   aria-label="edit"
    //                 >
    //                   <EditIcon />
    //                 </IconButton>
    //                 <IconButton
    //                   onClick={() => deleteProject(project.id)}
    //                   aria-label="delete"
    //                 >
    //                   <DeleteIcon />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))}
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

  export function makeColumnDef<T>(col: string): ColumnDef<T> {
    return ({
      accessorKey: col,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    });
  
  }

  interface HasId {
    id: number
  };

  export function makeActionColumn<T extends HasId >(path: string, handleDelete: (id: number) => any): ColumnDef<T> {
    return ({
      accessorKey: "action",
      cell: (info) => (
        <div>
          <a href={`${path}/${info.row.original.id}`}>
            <IconButton aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </a>
          <a href={`${path}/${info.row.original.id}/edit`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(info.row.original.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      footer: (info) => info.column.id,
    });
}

export function makeColumnDefs<T extends HasId>(cols: string[], path: string, handleDelete: (id: number) => any): ColumnDef<T>[] {
    const columnDefs: ColumnDef<T>[] = cols.map(makeColumnDef<T>);
  
    const actionColumnDef: ColumnDef<T> = makeActionColumn<T>(path, handleDelete);
  
    return [...columnDefs, actionColumnDef];
  }
