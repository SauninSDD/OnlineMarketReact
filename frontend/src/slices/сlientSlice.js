import {createSlice} from "@reduxjs/toolkit";

export const ClientsSlice = createSlice({
    name: 'Clients',
    initialState: {
        Clients: [],
    },
    reducers: {
        setClients: (state, action) => {
            state.Clients = action.payload;
        }
    },
})

export const {setClients} = ClientsSlice.actions;

export default ClientsSlice.reducer;