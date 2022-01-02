import styled from 'styled-components';
import Upload from '../features/upload/Upload';

function UploadPage() {
  return (
    <>
      <PageTitle>New Post</PageTitle>
      <Upload />
    </>
  );
}

export default UploadPage;

const PageTitle = styled.h1`
  font-size: 1.625rem;
`;
