import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Svg = styled.svg`
    width: 30px;
    height: 30px;
    path {
        stroke: ${props => props.theme.textColor};
        stroke-width: 2;
    }
`;

const Text = styled.span`
    font-size: 24px;
    margin-left: 20px;
    color: ${props => props.theme.textColor};
`;

const svgVariants = {
    start: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)",
    },
    end: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)",
    }
}

function Loading () {
    return (
        <Wrapper>
            <Svg 
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
            >
                <motion.path
                    variants={svgVariants}
                    initial="start"
                    animate="end"
                    transition={{
                        default: {
                            duration: 1,
                            ease: "easeInOut"
                        },
                        fill: {
                            duration: 2,
                            ease: [1, 0, 0.8, 1],
                        }
                    }}
                    d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"
                ></motion.path>
            </Svg>
            <Text> Loading...</Text>
        </Wrapper>
    )
}

export default Loading;