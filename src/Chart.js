import { useState, useEffect } from "react";

import * as d3 from "d3";

import csv from "./nacimientos_2020_2022_09.csv";

import Line from "./Line";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let _data = await d3.csv(csv);

      //console.log(_data);

      const keys = Array.from(
        d3
          .rollup(
            _data,
            g => g.length,
            d => d.fecha_nacimiento
          )
          .keys()
      );

      const values = Array.from(
        d3
          .rollup(
            _data,
            g => g.length,
            d => d.fecha_nacimiento
          )
          .values()
      );

      _data = keys.map((d, i) => ({ x: keys[i], y: values[i] }));

      // console.log(_data);

      setData([
        {
          id: "Nacimientos",
          color: "hsl(215, 70%, 50%)",
          data: _data,
        },
      ]);
    };

    getData();
  }, []);

  return (
    <div>
      {/* {data.map(d => (
        <div>
          <span>{d.anio}</span>
          <span>{d.fecha_nacimiento}</span>
          <span>{d.sexo}</span>
          <span>{d.mun_alc_nacimiento}</span>
        </div>
      ))} */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Chart;
