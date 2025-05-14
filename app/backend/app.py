from flask import Flask, render_template, jsonify
import os

# Flaskアプリケーションのインスタンスを作成
app = Flask(__name__, 
           template_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'templates'),
           static_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'static'))

# ルートURL（トップページ）へのルーティング
@app.route('/')
def index():
    return render_template('index.html', title='ホーム - navStupro')

# # React CDNサンプル (一旦コメントアウト)
# @app.route('/react-sample')
# def react_sample():
#     return render_template('react_sample.html', title='React CDN サンプル')
# 
# # Reactビルドサンプル (一旦コメントアウト)
# @app.route('/react-app')
# def react_app():
#     return render_template('react_build.html', title='React アプリケーション')

# APIエンドポイントの例
@app.route('/api/data')
def get_data():
    return jsonify({
        "message": "FlaskからReactへのデータ",
        "items": ["アイテム1", "アイテム2", "アイテム3"]
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
