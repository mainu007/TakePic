import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '',
  imageUri: '',
  allPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPosts: (state, {payload}) => {
      state.allPosts = [...payload];
    },
    addPost: (state, {payload}) => {
      state.allPosts = [{...payload}, ...state.allPosts];
    },
    deletePost: (state, {payload}) => {
      state.allPosts = state.allPosts.filter(({id}) => id !== payload);
    },
  },
});

export const {setAllPosts, addPost, deletePost} = postSlice.actions;

export default postSlice.reducer;
