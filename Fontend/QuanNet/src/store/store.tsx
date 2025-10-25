import { configureStore } from "@reduxjs/toolkit";

// Cấu hình store chính
export const store = configureStore({
  reducer: {},
});

// Tạo type cho RootState và AppDispatch (rất quan trọng với TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
