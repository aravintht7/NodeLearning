let chai = require('chai');
let chaiHttp = require('chai-http');
const config = require('./config');

const { expect } = chai;

// var host = "http://localhost:"+config.port+"";
var host = "http://dev.iesaccess.com:8084";
console.log(host);
//Assertion
chai.should();
chai.use(chaiHttp);

describe("IES APIs", () => {

    it("Fetched Token", done => {
        let user ="BARJ";
        let scac = "ICC";
    chai
        .request(host)
        .post(`/dbget/${user}/${scac}`)
        .send({ "password" : "qbttxpse"})
        .end( async (err, res) => {
        expect(res).to.have.status(200); 
        // console.log("token",res.body.token);
        tok = await res.body.token;
        done();

        });
    })

    it("Data from Assigned", done => {
    
            chai.request(host)
            .post("/getAssignedViewies")
            .set('Authorization' , "Bearer " +tok)
            .send({ selectedColumn : "order_number"})
            .end((err, res) => {
            // console.log("from assigned",res); 
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status');
            expect(res.body.data).to.be.an('array');
            done();
        });
    })
    it("Data from Inprogress", done => {
    
              chai.request(host)
              .post("/getInprogressviewies")
              .set('Authorization' , "Bearer " +tok)
              .send({ selectedColumn : "order_number"})
              .end((err, res) => {
            // console.log("from assigned",res); 
               expect(res).to.have.status(200);
               expect(res.body).to.have.property('status');
               expect(res.body.data).to.be.an('array');
               done();
    
        });
        
    })
    it("Data from Completed",done => {
    
                chai.request(host)
                .post("/getCompletedViewies")
                .set('Authorization' , "Bearer " +tok)
                .send({ selectedColumn : "all", limit : 10, offset : 0 })
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');
                
                // this.timeout(50000);
                // setTimeout(done, 30000);
                done();
                });
            
    })
    it("Data from Available",done => {
    
                chai.request(host)
                .post("/getAvailableviewies")
                .set('Authorization' , "Bearer " +tok)
                .send({ selectedColumn : "all"})
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');
                done();
                });
    })
    it("Data from Units",done => {
    
                chai.request(host)
                .post("/getUnitsViewies")
                .set('Authorization' , "Bearer " +tok)
                .send({ selectedColumn : "all","limit" : 5})
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
    it("Data from Divisions",done => {
    
                chai.request(host)
                .get("/getDivisionDetailsies")
                .set('Authorization' , "Bearer " +tok)
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
    it("Data from Area",done => {
    
                chai.request(host)
                .get("/getAreaDetailsies")
                .set('Authorization' , "Bearer " +tok)
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
    it("Data from ActionCode",done => {
    
                chai.request(host)
                .post("/getActionCodeies")
                .set('Authorization' , "Bearer " +tok)
                .send({ "gridName": "UNITS"})
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
    it("Data from CustomView",done => {
    
                chai.request(host)
                .post("/getDataViewies")
                .set('Authorization' , "Bearer " +tok)
                .send({ "view" : "PSAVLLDSVW",
                "selectedColumn" : "all" })
                .end((err, res) => {
                // console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
    it("Data from MapIt",done => {
    
                chai.request(host)
                .post("/getLatLongies")
                .set('Authorization' , "Bearer " +tok)
                .send({ "order_number": "0041180",
                    "dispatch_number": "02"
                })
                .end((err, res) => {
                console.log("from assigned",res); 
                // var response = await res;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status');
                expect(res.body.data).to.be.an('array');    
                done();
                });
    })
});
