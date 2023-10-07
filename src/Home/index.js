import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../app/action";

export default function Home() {

    const dispatch = useDispatch();

    //initial state declaration
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [brewedBefore, setBrewedBefore] = useState();
    const [brewedAfter, setBrewedAfter] = useState('');

    //get data from store
    const fetchDataList = useSelector(state => state.initialData);

    const Api_Url = "https://api.punkapi.com/v2/beers";

    const paramsUrl = "?page=" + page + "&per_page=" + perPage;

    useEffect(() => {

        const fetchData = async () => {
            const items = await axios.get(`${Api_Url}${paramsUrl}`);
            console.log("fetch1", items.data);
            dispatch(fetchApiData(items.data));
        }
        fetchData();

    }, [page, perPage]);

    //filter for brewed before 
    const handleChange = (e) => {
        setPerPage(e.target.value);
    }

    const handleFilterBefore = (e) => {
        setBrewedBefore(e.target.value);
    }

    const filterBeforeSubmit = (e) => {
        e.preventDefault();
        let splitDate = brewedBefore.split("-");
        console.log("splitDae", splitDate);
        let dateValue = splitDate[1] + '-' + splitDate[0];
        filterBrewedBefore(dateValue);
    }

    const filterBrewedBefore = (data) => {

        const brewedParams = "?brewed_before=" + data;

        const fetchBrewedBeforeData = async () => {
            const items = await axios.get(`${Api_Url}${brewedParams}`);
            console.log("fetch2", items.data);
            dispatch(fetchApiData(items.data));
        }
        fetchBrewedBeforeData();
    }

    //filter for brewed after
    const handleFilterAfter = (e) => {
        setBrewedAfter(e.target.value);
    }

    const filterAfterSubmit = (e) => {
        e.preventDefault();
        let splitDate = brewedAfter.split("-");
        console.log("splitDae", splitDate);
        let dateValue = splitDate[1] + '-' + splitDate[0];
        filterBrewedAfter(dateValue);
    }

    const filterBrewedAfter = (data) => {

        const brewedParams = "?brewed_after=" + data;

            const fetchBrewedAfterData = async () => {
                const items = await axios.get(`${Api_Url}${brewedParams}`);
                console.log("fetch3", items.data);
                dispatch(fetchApiData(items.data));
            }
            fetchBrewedAfterData();
    }

    return (
        <div>
            <Container className="mt-4">
                <Row>
                    <Col className="beerTableCol">
                        <h2 className="mb-4">Below table listed with data from punk api</h2>
                        <Form>
                            <Row>
                                <Col md={6} className="mb-4" xs={12}>
                                    <Form.Label>Filter for brewed before</Form.Label>
                                    <Form.Control type="date" onChange={handleFilterBefore} className="mb-3" />
                                    <Button variant="primary" type="submit" onClick={filterBeforeSubmit}>Submit</Button>
                                </Col>
                                <Col md={6} className="mb-4" xs={12}>
                                    <Form.Label>Filter for brewed after</Form.Label>
                                    <Form.Control type="date" onChange={handleFilterAfter} className="mb-3" />
                                    <Button variant="primary" type="submit" onClick={filterAfterSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table responsive striped bordered hover variant="dark" className="mb-4 ">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>name</th>
                                    <th>tagline</th>
                                    <th>first brewed</th>
                                    <th>description</th>
                                    <th>image</th>
                                    <th>abv</th>
                                    <th>ibu</th>
                                    <th>target fg</th>
                                    <th>target og</th>
                                    <th>ebc</th>
                                    <th>srm</th>
                                    <th>ph</th>
                                    <th>attenuation level</th>
                                    <th>volume</th>
                                    <th>boil volume</th>
                                    <th>mash temp</th>
                                    <th>mash temp duration</th>
                                    <th>fermentation</th>
                                    <th>twist</th>
                                    <th>ingredients malt</th>
                                    <th>hops</th>
                                    <th>yeast</th>
                                    <th>food pairing</th>
                                    <th>brewers tips</th>
                                    <th>contributed by</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fetchDataList.length > 0 ?

                                        fetchDataList.map((items, index) => (
                                            <tr key={index}>
                                                <td>{items.id}</td>
                                                <td>{items.name}</td>
                                                <td>{items.tagline}</td>
                                                <td>{items.first_brewed}</td>
                                                <td>{items.description}</td>
                                                <td className="imageTd"><img src={items.image_url} /></td>
                                                <td>{items.abv}</td>
                                                <td>{items.ibu}</td>
                                                <td>{items.target_fg}</td>
                                                <td>{items.target_og}</td>
                                                <td>{items.ebc}</td>
                                                <td>{items.srm}</td>
                                                <td>{items.ph}</td>
                                                <td>{items.attenuation_level}</td>
                                                <td>{items.volume.value} {items.volume.unit}</td>
                                                <td>{items.boil_volume.value} {items.boil_volume.unit}</td>
                                                <td>
                                                    {
                                                        items.method.mash_temp.map((data) => (
                                                            <div className="mb-3">{data.temp.value} {data.temp.unit}</div>
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        items.method.mash_temp.map((data) => (
                                                            <div>{data.duration}</div>
                                                        ))
                                                    }
                                                </td>
                                                <td>{items.method.fermentation.temp.value} {items.method.fermentation.temp.unit}</td>
                                                <td>
                                                    {
                                                        items.method.twist ?

                                                        <>
                                                        {items.method.twist}
                                                        </>
                                                        :

                                                        <>-</>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        items.ingredients.malt.map((data) => (
                                                            <div className="mb-3"><strong>{data.name}</strong> - {data.amount.value} {data.amount.unit}</div>
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        items.ingredients.hops.map((data) => (
                                                            <div className="mb-3"><strong>{data.name}</strong> - {data.amount.value} {data.amount.unit} - {data.add} {data.attribute}
                                                            </div>
                                                        ))
                                                    }
                                                </td>
                                                <td>{items.ingredients.yeast}</td>
                                                <td>
                                                    <ul>
                                                        {
                                                            items.food_pairing.map((data) => (
                                                                <li>
                                                                    {data}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </td>
                                                <td>{items.brewers_tips}</td>
                                                <td>{items.contributed_by}</td>
                                            </tr>
                                        ))

                                        :

                                        <></>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="paginateCol" xs={12}>
                        <PaginationControl
                            page={page}
                            between={4}
                            total={200}
                            limit={20}
                            changePage={(page) => {
                                setPage(page)
                            }}
                            ellipsis={1}
                        />
                    </Col>
                    <Col md={6} xs={12}>
                        <Form>
                            <Row>
                                <Col className="listPerPageCol">
                                    <Form.Label>Per Page</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select defaultValue="10" onChange={handleChange}>
                                        <option>10</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}