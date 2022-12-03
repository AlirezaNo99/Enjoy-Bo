import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import $ from "jquery";
import dynamic from 'next/dynamic'

import { Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  //   Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  Container,
  styled
} from '@mui/material';
import { toast } from 'react-toastify';
// import Breadcrumb from '../components/common/breadcrumb';
import PNotify from '../src/components/p-notify/p-notify';
import { createBrowserHistory } from 'history';
import {
  CModalBody,
  CCard,
  CCardHeader,
  CModal,
  CModalFooter,
  CTextarea,
  CFormSelect,
  CButton
} from '@coreui/react';
import axios from 'axios';
import Breadcrumb from '../src/components/breadcrumb';
import BootstrapTable from 'react-bootstrap-table-next';
// import { days, months, newYears } from '../components/date';
import { withCardActions } from '../src/components/hoc/index';
// import Loading from '../src/components/Loading/Example';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import CloseIcon from '@material-ui/icons/Close';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function productsList() {
  const styles = {
    submit: {
      marginTop: 10,
      // backgroundImage: "linear-gradient(to right, #00e184, #00bc91 29.71%)",
      backgroundColor: '#4CAF50',
      height: 50,
      color: '#fff',
      fontFamily: 'DIROOZ',
      marginBottom: 20,
      fontSize: 16,
      '&:hover,&:focus': {
        backgroundColor: '#5bcc5f'
      }
    },

    calendarContainer: {
      fontFamily: 'DIROOZ-FD',
      height: "40px",
      color: 'gray',
      padding: 5,
      width: '100%',
      border: '1px solid #e5e7e9',
      borderRadius: 5,
      fontSize: 15
      // border: "none",
    },
    btn: {
      marginTop: 10,
      backgroundColor: '#00acc1',
      height: 50,
      color: '#fff',
      fontFamily: 'DIROOZ',
      fontSize: 16,
      cursor: 'pointer',

      '&:hover,&:focus': {
        backgroundColor: '#00acc1'
      }
    }
  };
  const useStyles = makeStyles(styles);

  const classes = useStyles();
  const [errors, setErrors] = useState({
    typeRegister: '',
    firstName: '',
    lastName: '',
    date: '',
    certificatePlace: '',
    sacrificeTypeId: '',
    sacrificeRelId: '',
    certificateNumber: '',
    phone: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    mobileNumber: '',
    email: '',
    nationalCode: '',
    password: '',
    repeatPass: '',
    sacrificeFileNumber: '',
    faxNumber: ''
  });
  // $(".num-input").on("input", function () {
  //   var c = this.selectionStart,
  //     r = /[^0-9]/gi,
  //     v = $(this).val();
  //   if (r.test(v)) {
  //     $(this).val(v.replace(r, ""));
  //     c--;
  //   }
  //   this.setSelectionRange(c, c);
  // });

  //-----------------------------------
  const [proName, setProName] = useState('');
  const [proCategory, setProCategory] = useState('');
  const [proMainPriceFrom, setProMainPriceFrom] = useState('');
  const [proMainPriceTo, setProMainPriceTo] = useState('');
  const [proqtyFrom, setProqtyFrom] = useState('');
  const [proqtyTo, setProqtyTo] = useState('');
  const [proState, setProState] = useState("")
  const [page, setPage] = useState(1);

  const [table, setTable] = useState([{
    id: "1",
    proName: "اسنیکرز",
    mainPic: "./images/snickers01.jpg",
    mainPrice: "20,000",
    count: "5",
    stateTitle: "فعال"

  }])
  //-----------------------------------
  const columns = [
    {
      dataField: "id",
      text: "ردیف",
    },
    {
      dataField: "proName",
      text: "نام محصول",
    },
    {
      dataField: "mainPic",
      text: "تصویر اصلی",
    },
    {
      dataField: "mainPrice",
      text: "قیمت اصلی",
    },
    {
      dataField: "count",
      text: "تعداد",
    },
    {
      dataField: "stateTitle",
      text: "وضعیت",
    },
    {
      dataField: "edit",
      text: "ویرایش",
    },
    {
      dataField: "delete",
      text: "حذف",
    },
  ];

  const productsGenerator = (table) => {
    const items = [];
    for (let i = 0; i < table.length; i++) {
      items.push({
        id: i + 1,
        proName: table[i].proName,
        mainPic: <img src={table[i].mainPic} height="90px" width="auto" className='m-auto' />,
        mainPrice: table[i].mainPrice,
        count: table[i].count,
        stateTitle: true ? "فعال" : "غیر فعال",
        edit: <img className='m-auto botton-image' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEx0lEQVR4nO3ZXYic1R3H8c95Zt1ZzYr4Ur2Q2ko1iJYUL0wtRtGN9KK1rZpYUGSTtRhfYFGosjtJwJESdrP4QulF1Rbsxpu2q6gYehUT34IYK2owWqo3Ct4YsYIxyawzz+nFbtZNdqPzzMvuLD7fy3kezjnf3/mfM+fwkJOTk5OTk5OT890kLPYAMjMYi4pO0etT5ZA229zSCWAwFvV6AL/DiTiI7aIxo+GNRptNWjW+tjIYi5Z5Cr8V3CJxCe7E9wV7bIyjboiFRpru/Ao4Ih9cItVna9h31PNSXIc/4zkfuMlEqGVpvrMr4Gv5qwSPzpGHkTAucSV+5XxbsnbRuQF8Lb9SaqUoGo4b5n13S9iDO0T3Go4XZ+mmMwOYXfa8LHGakXCf4OzjhjASxvGaYChLV50XwNRu/6Tgl1I3KLoRtyvFy781hOARXKMc6/bqrACOyLMS/5H4o4qTFQ2oL4S9WOaAM+rtsnMCmC2f6hMN4sfYkSGEC3FQr8/r7bYzAjhWnkTiTgUXoNvxQmD/TBtD8SLRw/ircpist+vFPwfMJ19wv279DikoGMdyUQVXK/pCxeN4xEh42ca4QrQON4te96U1/hQq9Xa/uAHUI19V0uUz7Jo3hNRnErtFr2SVZzGXQL3yY+E9qZNF75u7HO6W2NWoPHS1WKs+ssiLQVBWNKDqdDXvYodD7pJYJdrTqDyLUQFZ5IfjD93je0bCzaiqGRP8HD0SL9KcPAu9B2STP0/woFS/E0UV49gkFSR2Yo8D1jYjDw1dIRuiHLsVTOCngtVSqS73q1qvqiCxTWqTsfDutPzDGNCjpuIJwWbUBM/jLUVrjDUnz0JVQDl2q5jAzwR9qmq6/EHVgCCZlt9oa9g3S369oq+m5TeJqtiJtxVdpxwOt2Jo7d8EZ8unVoudI0+7K2CufLWT5GlnAEtAnnYFsETkaUcAzchP2obNCyVPqw9CWeQ3x/PnyNdmzXz0VrvlaWUFZJWvecix8omaI/I9rm+3PK0KYInK04ol0Dr5XQstTysOQpP+iUsFfQi6bNGtX23mbD88c7aveUDUP328HVdT0qUgzlxs1hpt/nibheYCKMXLRL/Bh4JzFQx848UmWj9LfuO0/PNadLFphOYCiDYIdiOVekbwk6UkTzOb4HA8VfCx4Bbdtqv4F84R7ZUamkf+SxX/6CR5mtkEE/044AtPK4cDin6BjwQrJA7Nkd+n5iu3dZL8lEajRLdifEbg6BBewEOi9UZ9btLf/cDpup3ZSfI0GsBQXGXqI8Rfjvr92ErgFELUrb8T5Wl0DyjFbTjbSFg97/NyPEnFdvxIQZ+aE0z9z7+50P/z30b2ChiOp2KtcMzsz6YcDir6NT5UsxMv4t96XNtJ8jQSwNTm1yPae9x3BmPRpGum2z9H8KqiNVk+WS0U2ZdAKb4jeFV0puj3RsMHs54tx61Yh17RhOAxI2F3y0bcYrIFMBRXSbyEC0T7BX9DSbBCtAFX4j08KnrCaPhf64fcWrKdBBMb8IKR8F+luFzwiWif6DAmpK6wNbzSlpG2ifor4J64zAn241mc5chsB49JbVsKsz0f9VdAr0MO2yG41hKd7eYpx0Q5nrTYw8jJycnJycnJyclpnv8DkKLNZ+h3Ff0AAAAASUVORK5CYII=" />,
        delete: <img className='m-auto botton-image' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEd0lEQVR4nO3aaahVVRTA8d9xykYtmjQKKypKLUsEiSDsU4NhFA0QRR/qQeSHqGggMioiShqIUBooaIAKkyxDIho/FTQYNFlEUESDFZVW5rT6sPfL20t7vn3OPS/1/uHxzt33rOGus88+a6196NGjR48ePXp0m+CC4N3gp0H+3gnOb8uvUW0YCS7CA7gL76ahzVJhOh4JRlY82oZ/XSdYEdw0hPNvDj7ppk+tEYwJNgQnDUHmpCwzppu+0dAtEEnPFEzDOIzt+Ho0RuDsYMZWqpyUZa4O1nWMr8HPeB8fVKyv63tVRzjSj7sac7E/fsBK/F7XsS2wC/bB3vgG9+GOJgIxZIKdgteCX4JrggNbtH1QcG22/WqwU1u2O52YH3wfHN668U0+HBGsDG5v2/Aewarg4lYNb96XvuDXYPcS+aI1IDgFS3AhNpToqEHgD2k9+AIr8CNOr3hxqMpKnwJTs+GvsHOhjlI2SgH4E6urNBM/zT61FoDx2BUnFMo3xfRgjjQb9ixRUBqAsdgPfYXyTbOfwplYJxF6o0prwbATLCuVrROAycH9NeSbZDI+LhEsDcAP0pS7t+LDQh2NEGnxOyv71JrRMcGzORGa2prhf/sxLSdCS1vPBnMQngu+i1QI9Y9XwVXB45GuTKfM1ODB4IboKJiCscG8/N3UATInR+oP9A0Ynx78GCzKNUn75CAsDT7qGDsnuCQHYkFwWB4fGSzJWeSs4OYOmVuCE4Nx+ZyRefyQ4KFgdHBlcEaHzGfB4qhZ0Y6oI1yxFk9KFVo/R+OlKmVsL9s0Oybiw4pfK17FwR0ykyper/hFWlMmduhaVqWS+BmpW9TPeCyuWwnWCkCk2n/m5r/6+39/uj1CyuIGY2OHXyO2oKufmdmHYooDEKlpsdzwJkN9WJ59KaLODLgN30rNkOFibvbh1lIFdQJwPB7Wve7P1vB79qG4JqkTgF2kqmy46S+Ni6i1CG4P9AJQQ3adlnaWBmG0f7bOh0SdALwvNSNqtdZrUmUf3itVUOcK3oBXbD4Raov50gI4q1RB8QyoeFva6XmrVEcDvIkZFe+UKqhbC6zAogHDP+G3OnqHwKLsQzHdeArsJTVMtwl2+MdgNx5jC6X8fJug8QBUfN20zm6yw98CvQA0rTC4LNi3ab3dohszYIL2N0yL6d0CDegY+M7fFzg2Hx+Hz/Px9zgkC0zEqg6ZVZFmDhyaz4UvcWQ+npw//5ft9glmR0dbLPfw7w6eCK4YcO55wZN50+SAjvED8vlPBecOkJmXz1/YufsTrAlO6+Zv2yqCKUHU6cwW2Dw02zyqLZv/5UwVfBlc06LN6yPdarWpnQlW6UrciRuj8C2NAi7FdU0oaqSbkzcnX8Qx0mZFcYdmEGZigdQHmD0sL0huiWB88HywNngsODXSG5119U4I5uRd4PXB08FuTfhMw/28SPrOxOXS1RolNSxXF6ocJz2q1+IN3FPxQgOu/k3XGpr5xcWjpFlQunGxWsoJPqr+H5swPXr06NGjx/bEXxQ3aHLfzCIyAAAAAElFTkSuQmCC" />,
      });
    }
    return items;
  };
  const products = productsGenerator(table);
  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(page)
  return (
    <>
      <Head>
        <title>لیست محصولات</title>
      </Head>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="lg">
        <Grid md={8} xs={12} className="mt-20">
          <Breadcrumb current="لیست محصولات" />

          <div style={{ padding: '0px 5px' }}>
            <Accordion
              style={{
                direction: 'rtl',
                textAlign: 'right',
                backgroundColor: '#fff',
                margin: '20px 0px',
                fontFamily: 'DIROOZ-FD'
              }}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  style={{ fontFamily: 'DIROOZ-FD', padding: '0px 6px' }}
                >
                  جستجو ...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ fontFamily: 'DIROOZ-FD', color: 'black' }}>
                  <Row>
                    <Form.Group as={Col} lg={12}></Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        نام محصول
                      </div>
                      <Form.Control
                        onChange={(e) => setProName(e.target.value)}
                        value={proName}
                        type="text"
                        maxLength={20}
                      />
                    </Form.Group>

                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        دسته بندی
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                          height: 37
                        }}
                      >
                        <CFormSelect
                          style={{ width: '100%', color: 'black' }}
                          //   value={LoanState}
                          onChange={(e) => {
                            setProCategory(e.target.value);
                          }}
                          className="font-size-14"

                        >
                          <option value="">انتخاب کنید</option>

                          <option value={true}>گروه 1</option>
                          <option value={true}>گروه 2</option>
                        </CFormSelect>
                      </div>
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        قیمت محصول از
                      </div>
                      <Form.Control
                        onChange={(e) => setProMainPriceFrom(e.target.value)}
                        value={proMainPriceFrom}
                        type="text"
                        maxLength={20}
                        className="num-input"
                      />
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        قیمت محصول تا
                      </div>
                      <Form.Control
                        onChange={(e) => setProMainPriceTo(e.target.value)}
                        value={proMainPriceTo}
                        type="text"
                        maxLength={20}
                        className="num-input"
                      />
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        تعداد از
                      </div>
                      <Form.Control
                        onChange={(e) => setProqtyFrom(e.target.value)}
                        value={proqtyFrom}
                        type="text"
                        maxLength={20}
                        className="num-input"
                      />
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        تعداد تا
                      </div>
                      <Form.Control
                        onChange={(e) => setProqtyTo(e.target.value)}
                        value={proqtyTo}
                        type="text"
                        maxLength={20}
                        className="num-input"
                      />
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        {' '}
                        تاریخ ثبت از{' '}
                      </div>
                      <div id="toDatePicker">
                        <DatePicker
                          setTodayOnBlur={false}
                          placeholder=""
                          className={classes.calendarContainer}
                          timePicker={false}
                          isGregorian={false}
                          inputJalaaliFormat="jYYYY/jMM/jDD"
                          //   onChange={(value) => setToDate(value)}
                          //   value={toDate ? toDate : null}
                          style={{ minHeight: '20px' }}
                        />
                      </div>
                      {errors.date ? (
                        <span style={{ color: 'red' }}>{errors.date}</span>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10"
                      >
                        {' '}
                        تاریخ ثبت تا{' '}
                      </div>
                      {/* <div id="toDatePicker" style={{ height: "40px", width: "100%" }}> */}
                      <DatePicker
                        setTodayOnBlur={false}
                        placeholder=""
                        className={classes.calendarContainer}
                        timePicker={false}
                        isGregorian={false}
                        inputJalaaliFormat="jYYYY/jMM/jDD"
                        style={{ zIndex: "999999999999999999999999999999999999999" }}
                      //   onChange={(value) => setToDate(value)}
                      //   value={toDate ? toDate : null}
                      />
                      {/* </div> */}
                      {errors.date ? (
                        <span style={{ color: 'red' }}>{errors.date}</span>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col} lg={3}>
                      <div
                        style={{ padding: '0px 3px' }}
                        className="col-12 grey-form-heading mt-10 "
                      >
                        وضعیت
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                          height: 37
                        }}
                      >
                        <CFormSelect
                          style={{ width: '100%', color: 'black' }}
                          value={proState}
                          onChange={(e) => {
                            setProState(e.target.value);
                          }}
                          className="font-size-14"
                        >
                          <option value="">انتخاب کنید</option>

                          <option value={true}>گروه 1</option>
                          <option value={true}>گروه 2</option>
                        </CFormSelect>
                      </div>
                    </Form.Group>
                    <Col
                      lg={7}
                      xl={12}
                      style={{ textAlign: 'left', marginTop: '10px' }}
                    >
                      <Button
                        style={{
                          backgroundColor: '#4BB543	',
                          width: '100px',
                          fontFamily: 'DIROOZ-FD'
                        }}
                        // onClick={() => {
                        //   LoansReport();
                        //   setPage(1);
                        // }}
                        className="mb-1 mt-1 mr-1 color-white"
                        variant="primary"
                      >
                        جستجو
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABVElEQVQ4jc3TPWhUQRTF8TOJUYJtCssU9kEhjY2gldhosLKM21jYhy2ChZ2lraY0iJDaRjYQLMRO/GwEC3FLIZJiifwsnMWHvt23gQieZmDm3P/cM9xJ/rWwhE28xBBfMMAdLHbVlz9ga0m2kgyTbCd5n+RUkgtJriUZJblRSnk1S2drOEQfJxr7N3GAR3iC71iZJeY39FvO5nAdn/ACO3iD+WnATXxodtbiOVPf8z726/P8pTHgapLtUsrhJGApZYgrSSRZrjU7k4DLSd5NjPAb+rp2+zbJxTbPXF1/JFnoAja0kKQ1zRj4Mcm5IwDP15p21aH9itNdJJzFCJemmRbxGVsoU3wnsYdB18XBah3ax1ia0NmeX9roBNailTq0+3iKu7iHZzXmABv1R/Vmhc7Xb/gQu3iOB7jc8PSOBJ3x4vUKvf3fQ8fx148Tegu7xwZs6icIuFi5QSXEDwAAAABJRU5ErkJggg=="
                          style={{ marginRight: '6px' }}
                        />
                      </Button>
                    </Col>
                  </Row>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='p-10'>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={products}
              columns={columns}
              className="text-center"
              style={{ borderRadius: "10px", textAlign: "center" }}
            />
          </div>
          <Pagination count={10} page={page} onChange={handleChange} dir="ltr" />

        </Grid>
      </Container>
    </>
  );
}

export default productsList;
// productsList.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
