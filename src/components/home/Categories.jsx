import { Button, Table, TableHead, TableCell, TableRow, TableBody, styled } from '@mui/material';
import { categories } from '../../constants/data.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const StyledTable = styled(Table)`
  border: 1px solid black;
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${(props) => (props.isSelected ? 'coral' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 30px;
  width: 70%;
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#4169e1')};
  color: ${(props) => (props.disabled ? '#666666' : 'white')};
  &:hover {
    background-color: ${(props) => (props.disabled ? '#cccccc' : '#4942e4')};
    color: ${(props) => (props.disabled ? '#666666' : 'white')};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const Categories = () => {
 
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.type) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category.type);
    }
  };

  return (
    <div>
      <StyledLink to={selectedCategory !== '' ? `/create?category=${selectedCategory}` : '#'} disabled={selectedCategory === ''}>
        <StyledButton disabled={selectedCategory === ''}>Create Class</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <StyledLink to='/' onClick={() => setSelectedCategory('')}>
                All Classes
              </StyledLink>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <StyledTableCell isSelected={selectedCategory === category.type}>
                <StyledLink
                  to={`/?category=${category.type}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.type}
                </StyledLink>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Categories;
