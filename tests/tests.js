/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
/* jshint jasmine: true */
/* global navigator, done */
exports.defineAutoTests = function () {

    describe('Plugin conforms to w3c specs', function() {

        it("navigator.mediaDevices should exist", function(){
            expect(navigator.mediaDevices).toBeDefined();
            expect(typeof navigator.mediaDevices).toBe('object');
            expect(navigator.mediaDevices.enumerateDevices).toBeDefined();
            expect(typeof navigator.mediaDevices.enumerateDevices).toBe('function');
            // does not return ondevicechnge as defined
            //expect(navigator.mediaDevices.ondevicechange).toBeDefined();
            expect(navigator.mediaDevices.getSupportedConstraints).toBeDefined();
            expect(typeof navigator.mediaDevices.getSupportedConstraints).toBe('function');
            expect(navigator.mediaDevices.getUserMedia).toBeDefined();
            expect(typeof navigator.mediaDevices.getUserMedia).toBe('function');

        });

        it('enumerateDevices should return a promise with attributes', function(done){
            try{
                var promise = navigator.mediaDevices.enumerateDevices();
                expect(typeof promise.then).toBe('function');
                promise.then(function (info){
                    expect(info).toBeDefined();
                    expect(typeof info).toBe('object');
                    console.log(info);
                    info.forEach(function(device) {
                        expect(device.deviceId).toBeDefined();
                        expect(device.kind).toBeDefined();
                        expect(device.label).toBeDefined();
                        expect(device.groupId).toBeDefined();
                        expect(typeof device.deviceId).toBe('string');
                        expect(typeof device.kind).toBe('string');
                        expect(typeof device.label).toBe('string');
                        expect(typeof device.groupId).toBe('string');
                    });
                    done();
                }, function(err) {
                    expect(err).toBeDefined();
                    fail(err);
                    done();
                });
            } catch (err) {
                fail(err);
                done();
            }

        });

        it('getUserMedia should return a promise with attributes', function(done){
            try{
                var constraints =  {
                        video: true
                    };
                var promise = navigator.mediaDevices.getUserMedia(constraints);
                expect(typeof promise.then).toBe('function');
                promise.then(function (media){
                    expect(media).toBeDefined();
                    expect(typeof media).toBe('object');
                    // media.getworks with android studio 
                    var videoTracks = media.getVideoTracks();
                    expect(videoTracks[0].label).toBeDefined();
                    expect(videoTracks[0].kind).toBeDefined();
                    expect(videoTracks[0].id).toBeDefined();
                    expect(videoTracks[0].enabled).toBeDefined();
                    expect(videoTracks[0].muted).toBeDefined();
                    expect(videoTracks[0].onmute).toBeDefined();
                    expect(videoTracks[0].onunmute).toBeDefined();
                    expect(videoTracks[0].readyState).toBeDefined();
                    expect(videoTracks[0].onended).toBeDefined();
                   // expect(videoTracks[0].stop).toBeDefined();
                    // expect(videoTracks[0].getCapabilities).toBeDefined();
                    // expect(videoTracks[0].getConstraints).toBeDefined();
                    // expect(videoTracks[0].getSettings).toBeDefined();
                    //expect(videoTracks[0].applyConstraints).toBeDefined();

                    var audioTracks = media.getAudioTracks();
                    expect(audioTracks[0].label).toBeDefined();
                    expect(audioTracks[0].kind).toBeDefined();
                    expect(audioTracks[0].id).toBeDefined();
                    expect(audioTracks[0].enabled).toBeDefined();
                    expect(audioTracks[0].muted).toBeDefined();
                    expect(audioTracks[0].onmute).toBeDefined();
                    expect(audioTracks[0].onunmute).toBeDefined();
                    expect(audioTracks[0].readyState).toBeDefined();
                    expect(audioTracks[0].onended).toBeDefined();
                   // expect(audioTracks[0].stop).toBeDefined();

                    var tracks = media.getTracks();
                    expect(tracks[0].label).toBeDefined();
                    expect(tracks[0].kind).toBeDefined();
                    expect(tracks[0].id).toBeDefined();
                    expect(tracks[0].enabled).toBeDefined();
                    expect(tracks[0].muted).toBeDefined();
                    expect(tracks[0].onmute).toBeDefined();
                    expect(tracks[0].onunmute).toBeDefined();
                    expect(tracks[0].readyState).toBeDefined();
                    expect(tracks[0].onended).toBeDefined();
                   // expect(tracks[0].stop).toBeDefined();



                    done();
                }, function(err) {
                    expect(err).toBeDefined();
                    fail(err);
                    done();
                });
            } catch (err) {
                fail(err);
                done();
            }

        });

    });

};
