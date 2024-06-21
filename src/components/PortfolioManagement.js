import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { adminPostsState } from '../postAtoms';
import { fetchAdminPosts, createAdminPost, changeSequence, deletePost } from '../api/api';

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useRecoilState(adminPostsState);
  const [showForm, setShowForm] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    description: '',
    mainImage: null,
    portfolioImages: []
  });
  const [loading, setLoading] = useState(false);
  const [loadingSequence, setLoadingSequence] = useState(false);

  useEffect(() => {
    const loadPortfolios = async () => {
      const data = await fetchAdminPosts();
      console.log(data.data);
      setPortfolios(data.data);
    };
    loadPortfolios();
  }, [setPortfolios]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolio({ ...newPortfolio, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewPortfolio({ ...newPortfolio, [name]: files });
  };

  const moveUp = (index) => {
    if (index > 0) {
      const newPortfolios = portfolios.map((portfolio) => {
        return { ...portfolio }; // 객체 복사
      });
      [newPortfolios[index], newPortfolios[index - 1]] = [newPortfolios[index - 1], newPortfolios[index]];
      newPortfolios.forEach((portfolio, idx) => {
        portfolio.sequence = idx + 1;
      });
      setPortfolios(newPortfolios);
    }
  };

  const moveDown = (index) => {
    if (index < portfolios.length - 1) {
      const newPortfolios = portfolios.map((portfolio) => {
        return { ...portfolio }; // 객체 복사
      });
      [newPortfolios[index], newPortfolios[index + 1]] = [newPortfolios[index + 1], newPortfolios[index]];
      newPortfolios.forEach((portfolio, idx) => {
        portfolio.sequence = idx + 1;
      });
      setPortfolios(newPortfolios);
    }
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleSequenceButtonClick = async (e) => {
    e.preventDefault();
    setLoadingSequence(true);
    try {
      const response = await changeSequence(portfolios);
      console.log(response);
      setLoadingSequence(false);
      window.location.reload();
    } catch (error) {
      console.error('실패:', error);
      setLoadingSequence(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdPost = await createAdminPost(newPortfolio);
      console.log(createdPost);
      setLoading(false);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error('포트폴리오 등록 실패:', error);
      setLoading(false);
      alert('등록 실패');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deletePost(postId);
        setPortfolios(portfolios.filter(portfolio => portfolio.id !== postId));
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 실패');
      }
    }
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>번호</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>생성날짜</Th>
              <Th>수정날짜</Th>
              <Th>이동</Th>
              <Th>삭제</Th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio, index) => (
              <Tr key={portfolio.id}>
                <Td>{portfolio.sequence}</Td>
                <Td>{portfolio.title}</Td>
                <Td>{portfolio.author}</Td>
                <Td>{portfolio.createDate}</Td>
                <Td>{portfolio.updateDate}</Td>
                <Td>
                  {index > 0 && <MoveButton onClick={() => moveUp(index)}>↑</MoveButton>}
                  {index < portfolios.length - 1 && <MoveButton onClick={() => moveDown(index)}>↓</MoveButton>}
                </Td>
                <Td>
                  <DeleteButton onClick={() => handleDelete(portfolio.id)}>삭제</DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <ButtonContainer>
        <StyledButton onClick={handleAddButtonClick}>포트폴리오 추가</StyledButton>
        <StyledButton onClick={handleSequenceButtonClick} disabled={loadingSequence}>
          {loadingSequence ? '적용 중...' : '순서 적용'}
        </StyledButton>
      </ButtonContainer>
      {showForm && (
        <>
          <Overlay onClick={handleFormCancel} />
          <FormContainer>
            <Form onSubmit={handleFormSubmit}>
              <Label>
                제목 <br/>
                <Input
                  type="text"
                  name="title"
                  value={newPortfolio.title}
                  onChange={handleInputChange}
                />
              </Label>
              <Label>
                설명 <br/>
                <Input
                  type="text"
                  name="description"
                  value={newPortfolio.description}
                  onChange={handleInputChange}
                />
              </Label>
              <Label>
                대표 이미지 업로드 <br/>
                <Input
                  type="file"
                  name="mainImage"
                  onChange={handleFileChange}
                />
              </Label>
              <Label>
                포트폴리오 이미지 업로드 <br/>
                <Input
                  type="file"
                  name="portfolioImages"
                  multiple
                  onChange={handleFileChange}
                />
              </Label>
              <ButtonContainer>
                <StyledButton type="submit" disabled={loading}>
                  {loading ? '저장 중...' : '저장'}
                </StyledButton>
                <CancelButton type="button" onClick={handleFormCancel} disabled={loading}>
                  취소
                </CancelButton>
              </ButtonContainer>
            </Form>
          </FormContainer>
        </>
      )}
    </Container>
  );
};

export default PortfolioManagement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const TableContainer = styled.div`
  width: 100%;
  max-height: 500px;  /* 테이블의 최대 높이를 지정 */
  overflow-y: auto;  /* 테이블의 높이를 넘어가는 데이터는 스크롤 */
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  transition: transform 0.2s, box-shadow 0.2s;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const MoveButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  color: #333;
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #ddd;
    transform: scale(1.1);
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

const CancelButton = styled(StyledButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 60vw;
  max-width: 90%;
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;
