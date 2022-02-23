import React from "react";
import Button from "../components/Button";

import DataTable from "react-data-table-component";

const CustomHeader = (props) => {
  return (
    <div className="flex justify-between -mt-44">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {props.showButton ? (
        <Button className="text-sm mr-5" onClick={props.handleAddNew}>
          {props.buttonText}
        </Button>
      ) : null}
      {props.showSearchBar ? (
        <div className="text-sm rounded-b-xl ">
          <input
            className="form-input rounded-2xl text-gray-800 mt-0 outline-none"
            value={props.value}
            onChange={(e) => props.handleFilter(e)}
            placeholder="Search for product"
          />
        </div>
      ) : null}
    </div>
  );
};

class DataTableCustom extends React.Component {
  state = {
    filteredData: [],
    value: "",
  };

  handleFilter = (e) => {
    let value = e.target.value;
    let data = this.props.data;
    let filteredData = this.state.filteredData;
    this.setState({ value });

    if (value.length) {
      filteredData = this.props.data.filter((item) => {
        let startsWithCondition = 0;
        let includesCondition = 0;

        this.props.filterFields.forEach((field) => {
          startsWithCondition =
            startsWithCondition ||
            item[field].toLowerCase().startsWith(value.toLowerCase());
          includesCondition =
            includesCondition ||
            item[field].toLowerCase().includes(value.toLowerCase());
        });

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });

      this.setState({ filteredData });
    }
  };

  dataTable = () => {
    let { filteredData, value } = this.state;
    return (
      <>
        <DataTable
          className="dataTable-custom overflow-x-hidden"
          data={value.length ? filteredData : this.props.data}
          columns={this.props.columns}
          selectableRows={this.props.selectableRows}
          onSelectedRowsChange={this.props.onSelectedRowsChange}
          selectableRowSelected={this.props.selectableRowSelected}
          customStyles={{
            rows: {
              style: {
                paddingTop: "10px",
                paddingBottom: "10px",
                cursor: 'pointer',
                overflow: 'hidden'
              },
            },
          }}
          noHeader
          onRowClicked={(row) => {
            this.props.onRowClicked(row);
          }}
          pagination={!this.props.noPagination}
          paginationComponent={this.props.paginationComponent}
          noTableHead={this.props.noTableHead}
          subHeader={!this.props.noSubHeader}
          highlightOnHover={!this.props.noHightlightOnHover}
          subHeaderComponent={
            this.props.customSubHeaderComponent ? (
              this.props.customSubHeaderComponent
            ) : (
              <CustomHeader
                value={value}
                handleFilter={this.handleFilter}
                handleAddNew={this.props.handleAddNew}
                showButton={this.props.showButton}
                buttonText={this.props.buttonText}
                showSearchBar={this.props.showSearchBar}
              />
            )
          }
        />
        {this.props.footer ? this.props.footer : null}
      </>
    );
  };

  render() {
    return this.dataTable();
  }
}

export default DataTableCustom;
