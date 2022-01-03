import styled from 'styled-components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from './postsSlice';
import GridItem from '../../components/mainPage/GridItem';

function Posts() {
  const dispatch = useAppDispatch();
  const { allIds, thumbnailById } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <PostsContainer>
      {allIds.map((id) => (
        <GridItem thumbnailUrl={thumbnailById[id].thumbnailUrl} />
      ))}
    </PostsContainer>
  );
}

export default Posts;

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
