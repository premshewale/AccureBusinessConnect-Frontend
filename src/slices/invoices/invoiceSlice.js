import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice,
  updateInvoiceStatus  
} from "../../services/invoices/invoiceApi";

const initialState = {
  loading: false,
  invoices: [],
  invoice: null,
  success: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    resetInvoiceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.invoices.push(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.invoices = state.invoices.map(inv =>
          inv.id === action.payload.id ? action.payload : inv
        );
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.invoices = state.invoices.filter(inv => inv.id !== action.payload.id);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update status

      .addCase(updateInvoiceStatus.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateInvoiceStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.invoices = state.invoices.map(inv =>
    inv.id === action.payload.id ? action.payload : inv
  );
})
.addCase(updateInvoiceStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export const { resetInvoiceState } = invoiceSlice.actions;
export default invoiceSlice.reducer;
