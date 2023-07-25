import http from "@/utils/http";

export const getAcg2vecApiData = (tag: string) => {
    return http.get<Acg2vecApiDataRes>(`/acgvoc2vec`, { params: { tag } })
}

export const getIllust2vecData = (file: FormData) => {
    return http.postForm<Illust2vecApiDataRes>(`/similarityImages`, file)
}

export const searchIllustByDCLIP = (text: string) => {
    return http.get<Illust2vecApiDataRes>(`/searchIllustByDCLIP`, { params: { text } })
}

export const getPix2ScoreDate = (file: FormData) => {
    return http.postForm<Pix2ScoreApiDataRes>(`/pix2score`, file)
}
