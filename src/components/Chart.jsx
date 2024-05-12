import Chart from 'react-apexcharts';

const CreateChart = ({ data, chartName }) => {
  const options = {
    width:500,
    chart: {
      background: '#0551B630',
      toolbar: { 
        show: false // toolbarı kapatma
      }
    },
    responsive: [{
      breakpoint: 768, 
      options: {
        chart: {
          width: 270, 
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
        color: chartName === "Sales" ? "#008001" : "brown",
        fontSize: '20px',
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
