import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const CREATE_SIGNED_URLS = gql`
    mutation CreateSignedUrls($imageCount: Int!) {
        createSignedUrls(imageCount: $imageCount) {
            put_url
            get_url
        }
    }
`;

const getSignedUrls = async (
    imageCount: number
): Promise<{ putUrl: string; getUrl: string }[]> => {
    const result = await client.mutate({
        mutation: CREATE_SIGNED_URLS,
        variables: {
            imageCount,
        },
    });
    console.log(result);

    return result.data.createSignedUrls.map(
        (signedUrl: { put_url: string; get_url: string }) => ({
            putUrl: signedUrl.put_url,
            getUrl: signedUrl.get_url,
        })
    );
};

const uploadImage = async (images: File[]): Promise<string[]> => {
    console.log(1);
    const urls = await getSignedUrls(images.length);
    const putUrls = urls.map((url) => url.putUrl);
    console.log(putUrls);
    await uploadToCloudflare(putUrls, images);
    return urls.map((url) => url.getUrl);
};

const uploadToCloudflare = async (
    url: string[],
    image: File[]
): Promise<void> => {
    const promises = url.map((url, index) =>
        fetch(url, {
            method: "PUT",
            body: image[index],
        })
    );
    await Promise.all(promises);
};

// const getSignedUrls = (
//     count: number
// ): Promise<{ put_url: string; get_url: string }[]> => {
//     const baseURL = import.meta.env.VITE_APP_SELLER_APP_URL;

//     return new Promise((resolve, reject) => {
//         fetch(`${baseURL}/sellerclient/v1/signedUrls`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 __user__: "123",

//                 image_count: count,
//             }),
//         })
//             .then((res) => res.json())
//             .then((res) => {
//                 console.log(res);
//                 if (res.error) {
//                     reject(res.error);
//                 } else {
//                     resolve(res.results);
//                 }
//             })
//             .catch((err) => reject(err));
//     });
// };

export default uploadImage;
