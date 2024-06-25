import React, { useState, useEffect } from 'react';
import './Bot.scss';

// �w�q�@�ӦW�� ChatWindow �� React ��Ʋե�A�ñ����@�� token �@���Ѽ�
const ChatWindow = ({ token }) => {
    // �ϥ� useState Hook �Ӻ޲z��ѵ��f�O�_�}�Ҫ����A
    const [isOpen, setIsOpen] = useState(false);

    // �w�q�@�Ө�ơA�Ω������ѵ��f���}�ҩM�������A
    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    // �ϥ� useEffect Hook �Ӻ�ť isOpen �M token ���ܤ�
    useEffect(() => {
        if (isOpen) {
            // �p�G��ѵ��f�}�ҡA�ʺA�[�� Web Chat ���}��
            const script = document.createElement('script');
            script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
            script.async = true;
            script.onload = () => {
                // ���}���[��������A�Ыؤ@�� Web Chat �� store
                const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
                    // �d�I DIRECT_LINE/INCOMING_ACTIVITY ��ʡA�ñN�����x�s�b sessionStorage ��
                    if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                        const activities = JSON.parse(sessionStorage.getItem('chatActivities')) || [];
                        activities.push(action.payload.activity);
                        sessionStorage.setItem('chatActivities', JSON.stringify(activities));
                    }
                    return next(action);
                });

                // �ϥ� Web Chat ��V��ѵ��f
                window.WebChat.renderWebChat({
                    directLine: window.WebChat.createDirectLine({ token: 'vbDMrXBgEnI.gzigo-wOOnFG4Gv7kgaN45F-SlBVcJ3YQt1xZ3vZzC4' }),
                    styleOptions: {
                        bubbleBackground: '#f0f0f0', // �]�m��Ѫw�w���I����
                        bubbleBorderRadius: 20, // �]�m�t�β�Ѫw�w���ꨤ���סA��쬰����
                        bubbleFromUserBackground: '#0078d7', // �]�m�Τ��Ѫw�w���I����
                        bubbleFromUserTextColor: 'White', // �]�m�Τ��Ѫw�w����r�C��
                        bubbleFromUserBorderRadius: 20, // �]�m�Τ��Ѫw�w���ꨤ���סA��쬰����
                    },
                    store
                }, document.getElementById('webchat'));

                // �[�����e����Ѭ���
                const activities = JSON.parse(sessionStorage.getItem('chatActivities')) || [];
                activities.forEach(activity => {
                    store.dispatch({
                        type: 'DIRECT_LINE/INCOMING_ACTIVITY',
                        payload: { activity }
                    });
                });
            };
            // �N�}�������K�[����ɤ�
            document.body.appendChild(script);
        }
    }, [isOpen, token]);

    return (
        <div>
            {/* ��V�@�ӹϤ����s�A�Ω󥴶}�M������ѵ��f */}
            <img
                style={{ width: '150px', height: '150px' }}
                src="..\src\assets\images\icons\custom2.png"
                className="chat-button"
                title="�����ȪA <a href='https://zh.pngtree.com/freepng/green-little-brother-boy-customer-service_4533556.html'>png �Ϥ��ӷ��� zh.pngtree.com/</a>"
                onClick={toggleChatWindow}
                alt="Chat Button"
            />
            {/* �p�G��ѵ��f�O�}�Ҫ��A�h��V��ѵ��f */}
            {isOpen && (
                <div id="chatWindow" className="chat-window">
                    <div id="webchat" role="main"></div>
                    {/* �������s */}
                    <button className="close-button" onClick={toggleChatWindow}>X</button>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
