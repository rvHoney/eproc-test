interface ImagePillProps {
    bgImage: string;
}

export default function ImagePill({ bgImage }: ImagePillProps) {
    return (
        <span className="inline-flex items-center">
            <div
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: '500%',
                    backgroundPosition: '48% center',
                }}
                className="flex justify-center items-center h-8 w-20 sm:h-10 sm:w-24 md:h-12 md:w-28 rounded-full border border-black shadow-[4px_4px_0_black]"
            >
            </div>
        </span>
    );
}