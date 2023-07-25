
interface ApiResponse<T> {
    message: string,
    data: T
}
interface Acg2vecApiDataRes extends ApiResponse<Array<string>> {
}

interface Illust2vecApiDataRes extends ApiResponse<Array<ImageUrlItem>> {

}
interface ImageUrlItem {
    id: string
    artistId: Number
    title: string
    type: string
    caption: string
    artistPreView: [
        {
            id: Number,
            name: string,
            account: string,
            avatar: string
        }
    ],
    tags: [
        {
            name: string,
            translatedName: string,
            id: Number
        }
    ],
    imageUrls: [
        {
            squareMedium: string,
            medium: string,
            large: string,
            original: string
        }
    ],
    tools: string[],
    createDate: string,
    width: number,
    height: number,
    sanityLevel: number,
    restrict: number,
    totalView: number,
    totalBookmarks: number,
    xrestrict: number
}
interface Pix2ScoreApiDataRes extends ApiResponse<Pix2ScoreData> {

}
interface Pix2ScoreData {
    bookmarkPredict: Array<number>,
    viewPredict: Array<number>,
    sanityPredict: Array<number>,
}