import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout(): JSX.Element {
  return (
    <StyledDashboardLayout>
      <div>Статистика</div>
      <div>Cегодняшняя деятельность</div>
      <div>Продолжительность пребывания</div>
      <div>График продаж</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
