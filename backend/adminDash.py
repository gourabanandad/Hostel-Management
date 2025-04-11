from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)

def generate_base64_chart(fig):
    buffer = io.BytesIO()
    fig.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    plt.close(fig)
    return image_base64

@app.route('/api/charts')
def get_charts():
    df = pd.read_excel('hostel_data.xlsx')

    # Pie Chart: Total issues by status
    status_summary = df.groupby('Status')['Count'].sum()
    fig1, ax1 = plt.subplots()
    ax1.pie(status_summary, labels=status_summary.index, autopct='%1.1f%%', startangle=90)
    ax1.axis('equal')
    ax1.set_title('Distribution by Status')
    pie_chart = generate_base64_chart(fig1)

    # Bar Chart: Issue count per hostel per status
    pivot_df = df.pivot_table(index='Hostel', columns='Status', values='Count', fill_value=0)
    fig2, ax2 = plt.subplots()
    pivot_df.plot(kind='bar', stacked=True, ax=ax2)
    ax2.set_title('Issues by Hostel and Status')
    ax2.set_ylabel('Count')
    ax2.set_xlabel('Hostel Block')
    bar_chart = generate_base64_chart(fig2)

    return jsonify({
        'pie_chart': pie_chart,
        'bar_chart': bar_chart
    })

if __name__ == '__main__':
    app.run(debug=True)
