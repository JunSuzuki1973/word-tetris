/**
 * Word Tetris メインスクリプト
 * ゲームの初期化と画面遷移を管理
 */
document.addEventListener('DOMContentLoaded', () => {
    // 画面要素
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    
    // ボタン要素
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    
    // 難易度選択ボタン
    const easyButton = document.getElementById('easy-button');
    const mediumButton = document.getElementById('medium-button');
    const hardButton = document.getElementById('hard-button');
    const difficultyDescription = document.getElementById('difficulty-description');
    
    // 選択された難易度
    let selectedDifficulty = 'easy';
    
    // 難易度の説明テキスト
    const difficultyDescriptions = {
        easy: '初級: 短い簡単な単語から始めます。タイピング初心者におすすめです。',
        medium: '中級: やや長めの単語が登場します。タイピングに慣れてきた方向けです。',
        hard: '上級: 長く複雑な単語が登場します。タイピングの達人への挑戦です！'
    };
    
    // 難易度選択ボタンのイベントリスナー
    easyButton.addEventListener('click', () => selectDifficulty('easy'));
    mediumButton.addEventListener('click', () => selectDifficulty('medium'));
    hardButton.addEventListener('click', () => selectDifficulty('hard'));
    
    // 難易度選択関数
    function selectDifficulty(difficulty) {
        // 前の選択を解除
        easyButton.classList.remove('selected');
        mediumButton.classList.remove('selected');
        hardButton.classList.remove('selected');
        
        // 新しい選択を適用
        selectedDifficulty = difficulty;
        document.getElementById(`${difficulty}-button`).classList.add('selected');
        
        // 説明テキストを更新
        difficultyDescription.textContent = difficultyDescriptions[difficulty];
    }
    
    // ゲームインスタンス
    let game;
    
    // スタートボタンのイベントリスナー
    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        
        // 選択された難易度でゲーム開始
        game = new WordTetrisGame(selectedDifficulty);
        game.startGame();
    });
    
    // リスタートボタンのイベントリスナー
    restartButton.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // 選択された難易度で新しいゲームインスタンスを作成
        game = new WordTetrisGame(selectedDifficulty);
        game.startGame();
    });
    
    // キーボードショートカット
    document.addEventListener('keydown', (event) => {
        // ESCキーでゲームを一時停止/再開
        if (event.key === 'Escape') {
            // 一時停止機能の実装（オプション）
        }
    });
    
    // ウィンドウがフォーカスを失ったときに自動的に一時停止
    window.addEventListener('blur', () => {
        if (game && game.isGameActive && !game.isPaused) {
            // 一時停止機能の実装（オプション）
        }
    });
});