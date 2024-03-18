import styled from "styled-components";


export const GenericDashboardLayoutStyle = styled.main`
    @media (max-width: 998px) {
        .sidebar {
          display: none;
        }
      }
      @media (min-width: 998px) {
        display: grid;
        grid-template-columns: 18% 1fr;
        grid-template-rows: 80px 1fr;
        height: 100vh;
        overflow: hidden;
        .sidebar {
          grid-column: 1/2;
          grid-row: 1/3;
        }
        .header {
          grid-column: 2/3;
          grid-row: 1/2;
        }
        .ctrl{
          position: relative;
          overflow-y: scroll;
        }
        .main {
          grid-column: 2/3;
          grid-row: 2/3;
          padding: 0.75rem 1.5rem 3.75rem 1.35rem;
          height: 150vh;
          background: #F9FAFB;
        }
      }
    
`