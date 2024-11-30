import * as React from "react";
import { Box, Button } from "@mui/material";
import { Add, Edit, DeleteOutlined, Save, Close } from "@mui/icons-material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

// export default function FullTable({ pairQuestion, handleChange, language, questionType }) {
//   const [rows, setRows] = React.useState(
//     pairQuestion
//       ?.map((pair, index) => {
//         const [question, answer] = pair.split(" - ");

//         if (question && answer) {
//           return {
//             id: index,
//             question: question,
//             answer: answer,
//           };
//         }
//         return null;
//       })
//       .filter((row) => row !== null) || []
//   );

//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//     // handleChange({ type: "edit", rowId: id }, language);
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//     handleChange(
//       { type: "save", rowId: id, rowData: rows.find((row) => row.id === id) },
//       language
//     );
//   };

//   const handleDeleteClick = (id) => () => {
//     const deletedRow = rows.find((row) => row.id === id);
//     setRows(rows.filter((row) => row.id !== id));
//     handleChange({ type: "delete", rowId: id, rowData: deletedRow }, language);
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//       handleChange({ type: "cancel", rowId: id }, language);
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     handleChange(
//       { type: "update", rowId: newRow.id, rowData: updatedRow },
//       language
//     );
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const onProcessRowUpdateError = (error) => {
//     console.error("Error during row update:", error);
//   };

//   const columns = [
//     {
//       field: "question",
//       headerName: "Question",
//       flex: 1,
//       minWidth: 180,
//       editable: true,
//     },
//     {
//       field: "answer",
//       headerName: "Answer",
//       flex: 1,
//       minWidth: 220,
//       editable: true,
//     },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<Save />}
//               label="Save"
//               sx={{
//                 color: "primary.main",
//               }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<Close />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<Edit />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteOutlined />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         "& .actions": {
//           color: "text.secondary",
//         },
//         "& .textPrimary": {
//           color: "text.primary",
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowHeight={50}
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         onProcessRowUpdateError={onProcessRowUpdateError}
//         slots={{ toolbar: EditToolbar }}
//         slotProps={{
//           toolbar: { setRows, setRowModesModel },
//         }}
//       />
//     </Box>
//   );
// }

function EditToolbar(props) {
  const { setRows, setRowModesModel, isPair } = props;

  const handleClick = () => {
    // const id = Math.random().toString(36).substr(2, 9);
    const id = Math.random().toString(36).slice(2, 11);
    setRows((oldRows) => [
      ...oldRows,
      "pair"
        ? { id, pairA: "", pairB: "", isNew: true } // For "pair", add pairA and pairB
        : { id, statement: "", isNew: true }, // For "statement", add statement only
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "question" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
        startIcon={<Add />}
        onClick={handleClick}
      >
        {isPair ? "Add Pair" : "Add Statement"}
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullTable({
  pairQuestion,
  handleChange,
  language,
  questionType,
}) {
  // Initialize rows state with data from pairQuestion prop
  const [rows, setRows] = React.useState(() => {
    return (
      pairQuestion?.map((pair, index) => {
        if (questionType === 'pair' && pair.combined && pair.combined.includes('---')) {
          const [pairA, ...rest] = pair.combined.split('---');
          const pairB = rest.join('---').trim();
          if (pairA.trim() && pairB.trim()) {
            return { id: pair.id, pairA: pairA.trim(), pairB: pairB.trim() };
          }
        } else if (questionType === 'statement') {
          return { id: pair.id, statement: pair.combined };
        }
        return null; // Return null if pair doesn't meet the criteria
      }) || []
    );
  });

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    // Find the updated row from the rows state
    const updatedRow = rows.find((row) => row.id === id);

    // Update the row in the state
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isNew: false } : row
      )
    );

    // Call the change handler for saving
    handleChange({ type: 'save', rowId: id, rowData: updatedRow }, language);
  };

  const handleDeleteClick = (id) => () => {
    const deletedRow = rows.find((row) => row.id === id);
  
    if (!deletedRow) {
      console.error("Row with id:", id, "not found in rows.");
      return;
    }
  
    // Remove the row from the state
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  
    // Call the change handler for deletion
    if (deletedRow) {
      handleChange({ type: 'delete', rowId: id, rowData: deletedRow }, language);
    } else {
      console.error("Deleted row data is undefined", deletedRow);
    }
  };
  
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  
    const editedRow = rows.find((row) => row.id === id);
  
    if (!editedRow) {
      console.error("Edited row with id:", id, "not found.");
      return;
    }
  
    if (editedRow.isNew) {
      // If the row was newly added and editing is canceled, remove it
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      handleChange({ type: 'cancel', rowId: id }, language);
    }
  };
  

  // const handleDeleteClick = (id) => () => {
  //   const deletedRow = rows.find((row) => row.id === id);
  //   // Remove the row from the state
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));

  //   // Call the change handler for deletion
  //   handleChange({ type: 'delete', rowId: id, rowData: deletedRow }, language);
  // };

  // const handleCancelClick = (id) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });

  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow.isNew) {
  //     // If the row was newly added and editing is canceled, remove it
  //     setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  //     handleChange({ type: 'cancel', rowId: id }, language);
  //   }
  // };

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id ? { ...newRow, isNew: false } : row
      )
    );

    handleChange({ type: 'update', rowId: newRow.id, rowData: newRow }, language);

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const onProcessRowUpdateError = (error) => {
    console.error('Error during row update:', error);
  };

  const columns = [
    {
      field: questionType === 'pair' ? 'pairA' : 'statement',
      headerName: questionType === 'pair' ? 'Pair A' : 'Statement',
      flex: 1,
      minWidth: 180,
      editable: true,
    },
    ...(questionType === 'pair'
      ? [
          {
            field: 'pairB',
            headerName: 'Pair B',
            flex: 1,
            minWidth: 220,
            editable: true,
          },
        ]
      : []),
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Close />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlined />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowHeight={50}
        rowsPerPageOptions={[5]}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, isPair: questionType },
        }}
      />
    </Box>
  );
}

// export default function FullTable({
//   pairQuestion,
//   handleChange,
//   language,
//   questionType,
// }) {
//   const [rows, setRows] = React.useState(
//     pairQuestion
//       ?.map((pair, index) => {
//         if (questionType === "pair") {
//           if (typeof pair === "string" && pair.includes("---")) {
//             const [pairA, ...rest] = pair.split("---");
//             const pairB = rest.join("---").trim();

//             if (pairA.trim() && pairB.trim()) {
//               return {
//                 id: index,
//                 pairA: pairA.trim(),
//                 pairB: pairB.trim(),
//               };
//             }
//           }
//         } else if (questionType === "statement") {
//           return {
//             id: index,
//             statement: pair,
//           };
//         }

//         return null; // Return null if the pair doesn't meet the criteria
//       })
//       .filter((row) => row !== null) || [] // Filter out invalid rows
//   );

//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

//     // Find the updated row from the rows state
//     const updatedRow = rows.find((row) => row.id === id);

//     // Update the row in the state using prevRows.map() to make sure only the edited row is updated
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id
//           ? { ...row, isNew: false } // Set isNew to false after saving
//           : row
//       )
//     );

//     // Call the change handler (e.g., for saving)
//     handleChange({ type: "save", rowId: id, rowData: updatedRow }, language);
//   };

//   const handleDeleteClick = (id) => () => {
//     const deletedRow = rows.find((row) => row.id === id);
//     // Remove the row from the state
//     setRows(rows.filter((row) => row.id !== id));

//     // Call the change handler (e.g., for delete)
//     handleChange({ type: "delete", rowId: id, rowData: deletedRow }, language);
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       // If the row was newly added and editing is canceled, remove it
//       setRows(rows.filter((row) => row.id !== id));
//       handleChange({ type: "cancel", rowId: id }, language);
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     // Update the row in the state using prevRows.map() to make sure only the edited row is updated
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === newRow.id
//           ? { ...newRow, isNew: false } // Set isNew to false after updating
//           : row
//       )
//     );

//     // Call the change handler (e.g., for update)
//     handleChange(
//       { type: "update", rowId: newRow.id, rowData: newRow },
//       language
//     );

//     // Return the updated row
//     return newRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const onProcessRowUpdateError = (error) => {
//     console.error("Error during row update:", error);
//   };

//   const columns = [
//     {
//       field: questionType === "pair" ? "pairA" : "statement",
//       headerName: questionType === "pair" ? "pairA" : "Statement",
//       flex: 1,
//       minWidth: 180,
//       editable: true,
//     },

//     ...(questionType === "pair"
//       ? [
//           {
//             field: "pairB",
//             headerName: "pairB",
//             flex: 1,
//             minWidth: 220,
//             editable: true,
//           },
//         ]
//       : []),

//     // Always render actions column
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<Save />}
//               label="Save"
//               sx={{ color: "primary.main" }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<Close />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<Edit />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteOutlined />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         "& .actions": {
//           color: "text.secondary",
//         },
//         "& .textPrimary": {
//           color: "text.primary",
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowHeight={50}
//         rowsPerPageOptions={[5]}
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         onProcessRowUpdateError={onProcessRowUpdateError}
//         slots={{ toolbar: EditToolbar }}
//         slotProps={{
//           toolbar: { setRows, setRowModesModel, isPair: questionType },
//         }}
//       />
//     </Box>
//   );
// }


// export default function FullTable({
//   pairQuestion,
//   handleChange,
//   language,
//   questionType,
// }) {
//   // Initialize rows state with data from pairQuestion prop
//   const [rows, setRows] = React.useState(() => {
//     // Ensure pairQuestion is not undefined or null
//     return (
//       pairQuestion?.map((pair, index) => {
//         if (questionType === 'pair') {
//           if (typeof pair === 'string' && pair.includes('---')) {
//             const [pairA, ...rest] = pair.split('---');
//             const pairB = rest.join('---').trim();
//             if (pairA.trim() && pairB.trim()) {
//               return { id: index, pairA: pairA.trim(), pairB: pairB.trim() };
//             }
//           }
//         } else if (questionType === 'statement') {
//           return { id: index, statement: pair };
//         }
//         return null; // Return null if pair doesn't meet the criteria
//       }) || []
//     );
//   });

//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

//     // Find the updated row from the rows state
//     const updatedRow = rows.find((row) => row.id === id);

//     // Update the row in the state
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, isNew: false } : row
//       )
//     );

//     // Call the change handler for saving
//     handleChange({ type: 'save', rowId: id, rowData: updatedRow }, language);
//   };

//   const handleDeleteClick = (id) => () => {
//     const deletedRow = rows.find((row) => row.id === id);
//     // Remove the row from the state
//     setRows((prevRows) => prevRows.filter((row) => row.id !== id));

//     // Call the change handler for deletion
//     handleChange({ type: 'delete', rowId: id, rowData: deletedRow }, language);
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       // If the row was newly added and editing is canceled, remove it
//       setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//       handleChange({ type: 'cancel', rowId: id }, language);
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === newRow.id ? { ...newRow, isNew: false } : row
//       )
//     );

//     handleChange({ type: 'update', rowId: newRow.id, rowData: newRow }, language);

//     return newRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const onProcessRowUpdateError = (error) => {
//     console.error('Error during row update:', error);
//   };

//   const columns = [
//     {
//       field: questionType === 'pair' ? 'pairA' : 'statement',
//       headerName: questionType === 'pair' ? 'pairA' : 'Statement',
//       flex: 1,
//       minWidth: 180,
//       editable: true,
//     },
//     ...(questionType === 'pair'
//       ? [
//           {
//             field: 'pairB',
//             headerName: 'pairB',
//             flex: 1,
//             minWidth: 220,
//             editable: true,
//           },
//         ]
//       : []),
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<Save />}
//               label="Save"
//               sx={{ color: 'primary.main' }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<Close />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<Edit />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteOutlined />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         '& .actions': {
//           color: 'text.secondary',
//         },
//         '& .textPrimary': {
//           color: 'text.primary',
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowHeight={50}
//         rowsPerPageOptions={[5]}
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         onProcessRowUpdateError={onProcessRowUpdateError}
//       />
//     </Box>
//   );
// }


