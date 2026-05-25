import { useQuery } from "@tanstack/react-query";
import ThreeSixty from "react-360-view";

const ImageShowCase = ({ id, spinReverse = false, height = "650px", width = "100%" }) => {
    const {
        data: showcasedataImagesArray,
        error: showcasedataError,
        isLoading: showcasedataIsLoading,
    } = useQuery({
        queryKey: ['360showcase', id],
        queryFn: () => apiClient.get(`/get360ImagesByKitBoxId/${id}`),
        retry: 2,
        enabled: !!id,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        onError: (error) => {
            console.error('Fetch Error:', error);
        },
    });

    if (showcasedataIsLoading || !showcasedataImagesArray?.data?.[0]?.image_url) return <p>Loading...</p>;

    const imageArray = showcasedataImagesArray.data[0].image_url;

    // Extract common imagePath and confirm fileName pattern
    const sampleImage = imageArray[0];
    const imagePath = sampleImage.substring(0, sampleImage.lastIndexOf("/") + 1); // base URL
    const fileName = "{index}.png"; // because your files are named 1.png, 2.png...

    return (
        <div
            style={{
                width: "40%",
                border: "2px solid black",
                margin: "30px",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: width,
                    height: height,
                    overflow: "hidden",
                }}
            >
                {imageArray && <ThreeSixty
                    amount={imageArray.length}
                    imagePath={imagePath}
                    fileName={fileName}
                    spinReverse={spinReverse}
                />}
            </div>

            <div className="text-center mt-2 text-lg font-semibold text-gray-700">
                🔄 360° View
            </div>
        </div>
    );
};

export default ImageShowCase;
