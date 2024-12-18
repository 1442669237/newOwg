import request from "@/utils/request";

export function aaa() {
    return request({
        url: '/user/login',
        method: 'POST',
    })
}