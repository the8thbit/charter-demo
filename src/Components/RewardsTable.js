import { useState, useEffect } from 'react';

import Fade from '@material-ui/core/Fade';
import MUIDataTable from 'mui-datatables';
import { processPointsData } from '../Utilities/utilities';

const RewardsTable = ({ rawData }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      rawData.map((customer) => {
        const pointsData = processPointsData(customer.purchases);

        return {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          ...pointsData
        };
      })
    );
  }, [setTableData, rawData]);

  return (
    <Fade in timeout={1000}>
      <div>
        <MUIDataTable
          title={"Rewards Data"}
          columns={[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Jan", name: "jan" },
            { label: "Feb", name: "feb" },
            { label: "Mar", name: "mar" },
            { label: "Total", name: "total" }
          ]}
          data={tableData}
          options={{
            search: true,
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 20, 50],
            selectableRows: "none",
            responsive: "simple",
            elevation: 15
          }}
        />
      </div>
    </Fade>
  );
}

export default RewardsTable;