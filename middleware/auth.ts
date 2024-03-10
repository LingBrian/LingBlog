

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useCookie('auth')
    if (auth.value == undefined) {
        alert('未登录或cookie未开启')
        return navigateTo('/user/login')
    } else {
        const { data: result } = await useFetch('/api/user/auth', {
            method: 'post',
            body: {
                auth: auth.value
            }
        })
        if (!result.value?.login && to.path !== '/user/test') {
            if (result.value?.code == 0) {
                alert('未登录')
            } else if (result.value?.code == 2) {
                alert('登录超时，请重新登录')
            } else {
                alert(result.value?.code)
            }
            return navigateTo('/user/login')
        }
    }

})
