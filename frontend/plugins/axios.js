export default function ({ $axios, redirect, $toast }) {
  $axios.onRequest((config) => {
    //
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    console.log('code', error.response?.data?.message)
    if (code >= 400) {
      $toast.error(error.response?.data?.message || error.response.statusText, {
        duration: 10000
      })
    }
  })
}
