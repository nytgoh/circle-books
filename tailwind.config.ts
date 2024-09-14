import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'offWhite': '#FFFCEB',
                'paleYellow': '#F4F1DE',
                'fadedPaleYellow': '#e6e3d1',
                'darkPaleYellow': '#A6A69AFF',
                'terracotta': '#E07A5F',
                'darkBlue': '#3D405B',
                'sageGreen': '#81B29A',
                'sandYellow': '#F2CC8F',
                'softBeige': '#EADAC2',
                'mintGreen': '#A5C5B5',
                'lightGray': '#D3DAD6',
            },
        },
    },
    plugins: [],
} satisfies Config