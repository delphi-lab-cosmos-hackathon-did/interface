import { Global, css } from '@emotion/react'

const styles = css`
  body {
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  *,
  *:before,
  *:after {
    -webkit-overflow-scrolling: touch;
  }

  .Toastify {
    @media only screen and (max-width: 480px) {
      .Toastify__toast-container {
        margin: auto;
        left: 0;
        right: 0;
        width: 320px;
      }
      .Toastify__toast-container--top-center {
        top: 1rem;
      }
    }

    .Toastify__toast {
      min-height: 54px;
    }
    .Toastify__toast-body {
      margin: auto 0.5rem;
    }
  }
`

export const GlobalStyle = () => <Global styles={styles} />
