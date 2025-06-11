/**
 * Word Tetris ゲームクラス
 * ゲームのコア機能を管理
 */
class WordTetrisGame {
    constructor(difficulty = 'easy') {
        // ゲーム要素
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.wordInput = document.getElementById('word-input');
        
        // 難易度設定
        this.difficulty = difficulty; // 'easy', 'medium', 'hard'
        
        // ゲーム状態
        this.score = 0;
        this.level = 1;
        this.gameTime = 0;
        this.isGameActive = false;
        this.isPaused = false;
        
        // 落下単語の管理
        this.fallingWords = [];
        this.wordGenerationInterval = this.getWordGenerationInterval();
        this.lastWordTime = 0;
        
        // アニメーションとタイマー
        this.animationFrameId = null;
        this.gameTimer = null;
        
        // キャンバスのサイズ設定
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // 入力イベントの設定
        this.wordInput.addEventListener('input', () => this.checkInput());
    }
    
    /**
     * 難易度に基づいて単語生成間隔を取得
     */
    getWordGenerationInterval() {
        switch(this.difficulty) {
            case 'easy': return 3000; // 3秒
            case 'medium': return 2500; // 2.5秒
            case 'hard': return 2000; // 2秒
            default: return 3000;
        }
    }
    
    /**
     * 難易度に基づいて単語の落下速度を取得
     */
    getWordFallSpeed() {
        // 落下スピードをスコアに応じて調整
        // 超スローから始まり、スコアが上がるにつれて少しずつ加速する
        const minSpeed = 0.7; // 初期速度 (スコア0の時)
        const scoreIncreaseFactor = 200; // このスコアごとにベーススピードが1増加
        const baseSpeed = minSpeed + (this.score / scoreIncreaseFactor);

        const difficultyMultiplier = {
            'easy': 1,
            'medium': 1.2,
            'hard': 1.5
        }[this.difficulty] || 1;
        
        // 最大速度を設ける (ゲームバランスのため)
        const maxSpeed = 10; // 最大落下速度
        
        return Math.min(maxSpeed, baseSpeed * difficultyMultiplier);
    }
    
    /**
     * キャンバスのサイズをコンテナに合わせる
     */
    resizeCanvas() {
        const gameScreen = document.getElementById('game-screen');
        this.canvas.width = gameScreen.clientWidth;
        this.canvas.height = gameScreen.clientHeight - 70; // 入力欄のスペースを確保
    }
    
    /**
     * ゲームを開始する
     */
    startGame() {
        // ゲーム状態の初期化
        this.score = 0;
        this.level = 1;
        this.gameTime = 0;
        this.fallingWords = [];
        this.isGameActive = true;
        this.isPaused = false;
        this.lastWordTime = 0;
        this.wordGenerationInterval = 3000;
        
        // UI更新
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('timer').textContent = this.gameTime;
        
        // 入力フィールドをクリアしてフォーカス
        this.wordInput.value = '';
        this.wordInput.focus();
        
        // ゲームループ開始
        this.gameLoop(0);
        
        // ゲームタイマー開始
        this.gameTimer = setInterval(() => {
            this.gameTime++;
            document.getElementById('timer').textContent = this.gameTime;
            
            // 30秒ごとにレベルアップ
            if (this.gameTime % 30 === 0) {
                this.levelUp();
            }
        }, 1000);
    }
    
    /**
     * ゲームを停止する
     */
    stopGame() {
        this.isGameActive = false;
        
        // アニメーションとタイマーを停止
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // 最終スコアを表示
        document.getElementById('final-score').textContent = this.score;
    }
    
    /**
     * レベルアップ処理
     */
    levelUp() {
        this.level++;
        document.getElementById('level').textContent = this.level;
        
        // 単語生成間隔を短くする (最小500ms)
        this.wordGenerationInterval = Math.max(500, 3000 - (this.level - 1) * 250);
    }
    
    /**
     * 新しい単語を生成する
     */
    generateWord() {
        // 難易度に基づいて単語を選択
        const wordData = getRandomWord(this.difficulty);
        
        // 単語の初期位置を設定
        const wordWidth = this.ctx.measureText(wordData.word).width;
        const xPos = Math.random() * (this.canvas.width - wordWidth - 20) + 10;
        
        // 落下速度は難易度とレベルに応じて調整
        const fallSpeed = this.getWordFallSpeed();
        
        this.fallingWords.push({
            ...wordData,
            x: xPos,
            y: 0,
            speed: fallSpeed,
            active: false, // 入力中かどうか
            typed: '' // ユーザーが入力した部分
        });
    }
    
    /**
     * ユーザー入力をチェックする
     */
    checkInput() {
        const inputText = this.wordInput.value.toLowerCase().trim();
        
        if (!inputText) {
            // 入力がクリアされた場合、すべての単語のアクティブ状態をリセット
            this.fallingWords.forEach(word => {
                word.active = false;
                word.typed = '';
            });
            return;
        }
        
        // 入力テキストに一致する単語を探す
        let matchFound = false;
        
        for (let i = 0; i < this.fallingWords.length; i++) {
            const word = this.fallingWords[i];
            
            // 単語が入力テキストで始まる場合
            if (word.word.toLowerCase().startsWith(inputText)) {
                word.active = true;
                word.typed = inputText;
                matchFound = true;
                
                // 単語が完全に一致した場合
                if (word.word.toLowerCase() === inputText) {
                    // スコア加算 (単語の長さと難易度に応じて)
                    const basePoints = word.word.length * 10;
                    const levelMultiplier = 1 + (this.level * 0.1);
                    const heightBonus = Math.floor((this.canvas.height - word.y) / 50);
                    const points = Math.floor(basePoints * levelMultiplier) + heightBonus;
                    
                    this.score += points;
                    document.getElementById('score').textContent = this.score;
                    
                    // 単語を削除
                    this.fallingWords.splice(i, 1);
                    
                    // 入力フィールドをクリア
                    this.wordInput.value = '';
                    
                    break;
                }
            } else {
                // この単語は一致しない
                word.active = false;
                word.typed = '';
            }
        }
        
        // 一致する単語がない場合、入力テキストを赤くする等の視覚的フィードバックを追加できる
        if (!matchFound) {
            // 視覚的フィードバックを実装
        }
    }
    
    /**
     * ゲームの状態を更新する
     * @param {number} timestamp - 現在のタイムスタンプ
     */
    update(timestamp) {
        // 新しい単語の生成
        if (timestamp - this.lastWordTime > this.wordGenerationInterval) {
            this.generateWord();
            this.lastWordTime = timestamp;
        }
        
        // 単語の位置を更新
        for (let i = this.fallingWords.length - 1; i >= 0; i--) {
            const word = this.fallingWords[i];
            word.y += word.speed;
            
            // 単語が画面下部に到達した場合
            if (word.y > this.canvas.height) {
                this.fallingWords.splice(i, 1);
                
                // ゲームオーバー条件: 単語が地面に着いたらゲーム終了
                this.gameOver();
                return;
            }
        }
    }
    
    /**
     * ゲーム画面を描画する
     */
    render() {
        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 背景グリッドの描画（オプション）
        this.drawBackground();
        
        // 落下中の単語を描画
        this.fallingWords.forEach(word => {
            this.drawWord(word);
        });
    }
    
    /**
     * 背景グリッドを描画する
     */
    drawBackground() {
        this.ctx.strokeStyle = '#eee';
        this.ctx.lineWidth = 1;
        
        // 横線
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // 縦線
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }
    
    /**
     * 単語を描画する
     * @param {Object} word - 描画する単語オブジェクト
     */
    drawWord(word) {
        this.ctx.font = '24px Arial';
        
        // 単語の状態に応じて色を変更
        if (word.active) {
            // 入力中の単語
            // 入力済み部分を緑色で表示
            this.ctx.fillStyle = '#4CAF50';
            this.ctx.fillText(word.typed, word.x, word.y);
            
            // 残りの部分を黒色で表示
            this.ctx.fillStyle = '#333';
            this.ctx.fillText(word.word.substring(word.typed.length), 
                              word.x + this.ctx.measureText(word.typed).width, word.y);
        } else {
            // 通常の単語
            this.ctx.fillStyle = '#333';
            this.ctx.fillText(word.word, word.x, word.y);
        }
        
        // 単語の意味を小さく表示
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#666';
        this.ctx.fillText(word.meaning, word.x, word.y + 20);
    }
    
    /**
     * ゲームループ
     * @param {number} timestamp - 現在のタイムスタンプ
     */
    gameLoop(timestamp) {
        if (!this.isGameActive) return;
        
        this.update(timestamp);
        this.render();
        
        this.animationFrameId = requestAnimationFrame(timestamp => this.gameLoop(timestamp));
    }
    
    /**
     * ゲームオーバー処理
     */
    gameOver() {
        this.stopGame();
        
        // ゲームオーバー画面を表示
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.remove('hidden');
    }
}