// api.js

// api end point를 상수처리 해두면 나중에 변경 되었을 겨우 처리하기 쉬움
const API_ENDPOINT = 
    "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
    // nodeId 유무에 따라 root directory를 조회할지 특정 directory를 조회할지 처리
    try {
        const res = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ''}`);

        if (!res.ok) {
            throw new Error('서버의 상태가 이상합니다!');
        }

        return await res.json();
    } catch(e) {
        throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
}