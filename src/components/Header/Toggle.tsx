import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { isDarkAtom } from '../../atoms/atom';

const Wrapper = styled.div`
    width: 80px;
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

function Toggle() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <Wrapper
            data-darkmode={isDark}
            onClick={() => setDarkAtom(!isDark)}
            style={{ justifyContent: isDark ? 'flex-end' : 'flex-start' }}
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
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>
            </Box>
        </Wrapper>
    )
}

export default Toggle;