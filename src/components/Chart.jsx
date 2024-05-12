import Chart from 'react-apexcharts';

const CreateChart = ({ data, chartName }) => {
  const options = {
    stroke: {
      curve: 'smooth', 
      width: 3, 
      colors: [chartName === 'Sales' ? '#008001' : '#A5292A']
    },
    width:500,
    chart: {
      background: '#0551B630',
      toolbar: { 
        show: false // toolbarı kapatma
      },
    },
    responsive: [{
      breakpoint: 768, 
      options: {
        chart: {
          width: 300, 
        }
      }
    }],
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return new Date(value).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          });
        },
      },
    },
    title: {
      text: chartName,
      align: 'left',
      style: {
        fontSize: '20px',
        color:chartName === 'Sales' ? '#008001' : '#A5292A'
      },
    },
  
  };

  const series = [
    {
      name: chartName,
      data: data.map((item) => ({
        x: new Date(item.createdAt),
        y: item.amount,
      })),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={300}
      width={500}
    />
  );
};

export default CreateChart;
