import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atomos";
import { useLocation } from "react-router";

const Wrapper = styled.div`
    width: 100px;
    height: 40px;
    background-image: radial-gradient(circle farthest-corner at 10% 20%,
        rgba(253, 203, 50, 1) 0%,
        rgba(244, 56, 98, 1) 100.2%);
    border-radius: 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 5px;
    cursor: pointer;
    transition: all .3s;

    &[data-position="true"] {
        position: absolute;
        right: 2%;
    }

    .icon {
        color: #f88748;
    }

    &[data-darkmode="true"] {
        background-color: #52527a;

        background-image: linear-gradient(109.8deg,
                rgba(62, 5, 116, 1) -5.2%,
                rgba(41, 14, 151, 1) -5.2%,
                rgba(216, 68, 148, 1) 103.3%);

        .icon {
            color: #501a96;
        }
    }
`;

const Box = styled(motion.div)`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: #fff;
    overflow: hidden;
`;

const boxVariants = {
    start: {
        y: -30,
        opacity: 0,
    },
    end: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: 30,
        opacity: 0,
    }
}

function ChangeBtn () {
    const [isDark, setIsDark] = useRecoilState(isDarkAtom);
    const {pathname} = useLocation();

    return (
        <Wrapper 
            data-darkmode={isDark}
            onClick={() => setIsDark(!isDark)}
            style={{justifyContent: isDark ? 'flex-end' : 'flex-start'}}
            data-position={pathname === "/" ? true : false}
        >
            <Box layout>
                <AnimatePresence exitBeforeEnter initial={false}>
                    <motion.i 
                        className={`icon fas fa-${isDark ? 'moon' : 'sun'}`}
                        key={isDark ? 'moon' : 'sun'}
                        variants={boxVariants}
                        initial="start"
                        animate="end"
                        exit="exit"
                        transition= {{ duration: 0.2}}
                    />
                </AnimatePresence>
            </Box>
        </Wrapper>
    )
}

export default ChangeBtn;