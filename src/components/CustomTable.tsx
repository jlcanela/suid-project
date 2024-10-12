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
  } from "@suid/material";
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
            <TableFooter>
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
            </TableFooter>
          </Table>
          <div class="h-4" />
          {/* <button onClick={() => rerender()} class="border p-2">
            Rerender
          </button> */}
        </TableContainer>
      </>
    );
  }
