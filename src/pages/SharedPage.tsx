import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import sharedAPI from '../apis/sharedAPI';
import GridItem from '../components/mainPage/GridItem';
import Spinner from '../components/Spinner';
import Content from '../features/content/Content';

interface AlbumData {
  albumId: number;
  albumName: string;
  albumTag: string;
  postIds: number[];
  postThumbnailById: {
    [postId: number]: {
      thumbnailUrl: string;
    };
  };
}

function SharedPage() {
  const { albumTag } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<AlbumData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [contentOpen, setContentOpen] = useState({ isOpen: false, postId: 0 });

  async function fetchData(tag: string | undefined) {
    setLoading(true);
    const res = await sharedAPI.get(`/${tag}`);
    setLoading(false);
    return setData(res.data);
  }

  function handleOpenContent(postId: number) {
    setContentOpen({ isOpen: true, postId });
  }

  function handleCloseContent() {
    setContentOpen({ isOpen: false, postId: 0 });
  }

  useEffect(() => {
    fetchData(albumTag);
  }, []);

  return (
    <>
      {contentOpen.isOpen ? <Content postId={contentOpen.postId} handleClose={handleCloseContent} /> : null}

      <Page>
        <NavbarPosition>
          <NavbarContainer>
            <Title onClick={(e) => navigate('/')}>PhotoBook 📚</Title>
          </NavbarContainer>
        </NavbarPosition>
        {isLoading ? (
          <Spinner backgroundColor="rgb(0, 0, 0, 0.4)" />
        ) : (
          <PageContainer>
            <HeaderTitle>{`[Shared Album] ${data?.albumName}`}</HeaderTitle>

            {data?.postIds.length === 0 ? (
              <H3>{`Oops. It seems there's nothing in this album.`}</H3>
            ) : (
              <PostsContainer>
                {data?.postIds.map((postId) => (
                  <GridItem
                    postId={postId}
                    handleOpenContent={handleOpenContent}
                    thumbnailUrl={data?.postThumbnailById[postId].thumbnailUrl}
                  />
                ))}
              </PostsContainer>
            )}
          </PageContainer>
        )}
      </Page>
    </>
  );
}

export default SharedPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarPosition = styled.div`
  width: 100%;
  height: 4rem;
`;

const PageContainer = styled.div`
  padding: 1rem 0.5rem;
  width: min(45rem, 100%);
  min-width: 20rem;
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  z-index: 99;
  opacity: 0.96;

  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #505050;
`;

const Title = styled.h1`
  margin-left: 3rem;
  font-family: 'Baloo Bhai 2', cursive;
  font-size: 2rem;

  cursor: pointer;
  transition: all 300ms ease-in;
  :hover {
    opacity: 0.7;
  }
`;

const PostsContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const HeaderTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 1.625rem;
  color: #505050;
`;

const H3 = styled.h3`
  margin-top: 8rem;
  text-align: center;
  font-size: 1.25rem;
  color: #505050;
`;
